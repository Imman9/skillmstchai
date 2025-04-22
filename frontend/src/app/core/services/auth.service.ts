import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserRole } from '../models/user-role.enum';
import { environment } from '../../../environments/environment';

interface User {
  id: number;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  status: string;
  lastLogin?: Date;
}

interface AuthResponse {
  status: string;
  data: {
    token: string;
    refreshToken: string;
    user: User;
  };
}

interface ProfileResponse {
  status: string;
  data: {
    user: User;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.tokenSubject.next(localStorage.getItem('token'));
    this.refreshTokenSubject.next(localStorage.getItem('refreshToken'));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response.status === 'success' && response.data) {
            this.setTokens(response.data.token, response.data.refreshToken);
            // Add this line to store the user data
            this.currentUserSubject.next(response.data.user);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
          }
        }),
        catchError(this.handleError)
      );
  }

  register(userData: {
    email: string;
    password: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, userData)
      .pipe(
        tap(response => {
          const user = response.data.user;
          const token = response.data.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', token);
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/api/auth/logout`, {})
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.currentUserSubject.next(null);
        this.tokenSubject.next(null);
        this.refreshTokenSubject.next(null);
      });
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${environment.apiUrl}/api/auth/profile`)
      .pipe(
        tap(response => {
          const user = response.data.user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  updateProfile(profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Observable<ProfileResponse> {
    return this.http.put<ProfileResponse>(`${environment.apiUrl}/api/auth/profile`, profileData)
      .pipe(
        tap(response => {
          const user = response.data.user;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(this.handleError)
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/change-password`, {
      currentPassword,
      newPassword
    }).pipe(
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return new Observable(observer => {
        observer.error('No refresh token available');
      });
    }

    return this.http.post<AuthResponse>(`${environment.apiUrl}/api/auth/refresh-token`, { refreshToken })
      .pipe(
        tap(response => {
          if (response.status === 'success' && response.data) {
            this.setTokens(response.data.token, response.data.refreshToken);
          }
        })
      );
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getRefreshToken(): string | null {
    return this.refreshTokenSubject.value;
  }

  private setTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    this.tokenSubject.next(token);
    this.refreshTokenSubject.next(refreshToken);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

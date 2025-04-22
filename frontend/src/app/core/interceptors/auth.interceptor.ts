import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip token for login and refresh token endpoints
    if (request.url.includes('/auth/login') || request.url.includes('/auth/refresh-token')) {
      return next.handle(request);
    }

    const token = this.authService.getToken();
    if (token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/auth/refresh-token')) {
          if (this.isRefreshing) {
            return this.refreshTokenSubject.pipe(
              filter(token => token != null),
              take(1),
              switchMap((token) => {
                if (!token) {
                  this.handleAuthError();
                  return throwError(() => new Error('No token available'));
                }
                return next.handle(this.addToken(request, token));
              })
            );
          }

          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token);
              return next.handle(this.addToken(request, token));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.handleAuthError();
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleAuthError(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
} 
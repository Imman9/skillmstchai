import { Request, Response, NextFunction } from 'express';
import { EmployerProfileService } from '../services/employer-profile.service';
import { validateOrReject } from 'class-validator';
import { EmployerProfile } from '../models/employer-profile.model';
import { AppError } from '../middleware/errorHandler';

interface AuthenticatedRequest extends Omit<Request, 'user'> {
    user?: {
        id: number;
        email: string;
        role: string;
        firstName?: string;
        lastName?: string;
        isActive: boolean;
    };
}

export class EmployerProfileController {
    private employerProfileService: EmployerProfileService;

    constructor() {
        this.employerProfileService = new EmployerProfileService();
        // Bind methods to ensure correct 'this' context
        this.create = this.create.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.getMyProfile = this.getMyProfile.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.search = this.search.bind(this);
    }

    async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                throw new AppError('User not authenticated', 401);
            }

            const employerProfileData = {
                ...req.body,
                userId: req.user.id
            };

            const employerProfile = new EmployerProfile();
            Object.assign(employerProfile, employerProfileData);

            await validateOrReject(employerProfile).catch(errors => {
                const validationMessages = errors.map((error: { constraints: any; }) => 
                  Object.values(error.constraints || {}).join(', ')
                );
                throw new AppError(`Validation failed: ${validationMessages.join('; ')}`, 400);
              });;
            
            const createdProfile = await this.employerProfileService.create(employerProfileData);
            res.status(201).json({
                status: 'success',
                data: createdProfile
            });
        } catch (error: any) {
            if (error instanceof AppError) {
                next(error);
              } else if (error instanceof Error) {
                next(new AppError(error.message, 500));
              } else {
                next(new AppError('An unknown error occurred', 500));
              }
        }
    }

    async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid profile ID', 400);
            }

            const profile = await this.employerProfileService.findById(id);
            if (!profile) {
                throw new AppError('Employer profile not found', 404);
            }

            res.json({
                status: 'success',
                data: profile
            });
        } catch (error: any) {
            next(new AppError(error.message || 'Error fetching employer profile', error.status || 500));
        }
    }

    async getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                throw new AppError('User not authenticated', 401);
            }

            const profile = await this.employerProfileService.findByUserId(req.user.id);
            if (!profile) {
                throw new AppError('Employer profile not found', 404);
            }

            res.json({
                status: 'success',
                data: profile
            });
        } catch (error: any) {
            next(new AppError(error.message || 'Error fetching employer profile', error.status || 500));
        }
    }

    async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                throw new AppError('User not authenticated', 401);
            }

            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid profile ID', 400);
            }

            const existingProfile = await this.employerProfileService.findById(id);
            if (!existingProfile) {
                throw new AppError('Employer profile not found', 404);
            }

            if (existingProfile.userId !== req.user.id) {
                throw new AppError('Unauthorized to update this profile', 403);
            }

            const updateData = req.body;
            const employerProfile = new EmployerProfile();
            Object.assign(employerProfile, updateData);
            await validateOrReject(employerProfile);

            const updatedProfile = await this.employerProfileService.update(id, updateData);
            res.json({
                status: 'success',
                data: updatedProfile
            });
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                next(new AppError(`Validation error: ${error.errors?.join(', ')}`, 400));
            } else {
                next(new AppError(error.message || 'Error updating employer profile', error.status || 500));
            }
        }
    }

    async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                throw new AppError('User not authenticated', 401);
            }

            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid profile ID', 400);
            }
            
            const existingProfile = await this.employerProfileService.findById(id);
            if (!existingProfile) {
                throw new AppError('Employer profile not found', 404);
            }

            if (existingProfile.userId !== req.user.id) {
                throw new AppError('Unauthorized to delete this profile', 403);
            }

            const deleted = await this.employerProfileService.delete(id);
            if (deleted) {
                res.status(204).send();
            } else {
                throw new AppError('Error deleting profile', 500);
            }
        } catch (error: any) {
            next(new AppError(error.message || 'Error deleting employer profile', error.status || 500));
        }
    }

    async search(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { industry, location, page = '1', limit = '10' } = req.query;
            const skip = (Number(page) - 1) * Number(limit);

            if (isNaN(skip) || isNaN(Number(limit))) {
                throw new AppError('Invalid pagination parameters', 400);
            }

            const [profiles, total] = await this.employerProfileService.findAll({
                skip,
                take: Number(limit),
                industry: industry as string,
                location: location as string
            });

            res.json({
                status: 'success',
                data: profiles,
                meta: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            next(new AppError(error.message || 'Error searching employer profiles', error.status || 500));
        }
    }
} 
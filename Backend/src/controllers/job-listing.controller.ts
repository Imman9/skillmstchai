import { Request, Response, NextFunction } from 'express';
import { JobListingService } from '../services/job-listing.service';
import { validateOrReject } from 'class-validator';
import { JobListing, RemoteType } from '../models/job-listing.model';
import { AppError } from '../middleware/errorHandler';
import { EmployerProfileService } from '../services/employer-profile.service';

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

export class JobListingController {
    private jobListingService: JobListingService;
    private employerProfileService: EmployerProfileService;

    constructor() {
        this.jobListingService = new JobListingService();
        this.employerProfileService = new EmployerProfileService();
        // Bind methods to ensure correct 'this' context
        this.create = this.create.bind(this);
        this.getJobListing = this.getJobListing.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.search = this.search.bind(this);
        this.getFeaturedJobs = this.getFeaturedJobs.bind(this);
        this.incrementViewCount = this.incrementViewCount.bind(this);
        this.incrementApplicationCount = this.incrementApplicationCount.bind(this);
    }

    async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                throw new AppError('User not authenticated', 401);
            }

            // Check if user has an employer profile
            const employerProfile = await this.employerProfileService.findByUserId(req.user.id);
            if (!employerProfile) {
                throw new AppError('Employer profile not found', 404);
            }

            const jobListingData = {
                ...req.body,
                employerId: employerProfile.id,
                status: 'active'
            };

            const jobListing = new JobListing();
            Object.assign(jobListing, jobListingData);
            await validateOrReject(jobListing);

            const createdListing = await this.jobListingService.create(jobListingData);
            res.status(201).json({
                status: 'success',
                data: createdListing
            });
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                next(new AppError('Validation error', 400));
            } else {
                next(new AppError(error.message || 'Error creating job listing', error.status || 500));
            }
        }
    }

    async getJobListing(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid job listing ID', 400);
            }

            const jobListing = await this.jobListingService.findById(id);
            if (!jobListing) {
                throw new AppError('Job listing not found', 404);
            }

            res.json({
                status: 'success',
                data: jobListing
            });
        } catch (error: any) {
            next(new AppError(error.message || 'Error fetching job listing', error.status || 500));
        }
    }

    async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user?.id) {
                throw new AppError('User not authenticated', 401);
            }

            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid job listing ID', 400);
            }

            const jobListing = await this.jobListingService.findById(id);
            if (!jobListing) {
                throw new AppError('Job listing not found', 404);
            }

            // Check if user owns the job listing through employer profile
            const employerProfile = await this.employerProfileService.findByUserId(req.user.id);
            if (!employerProfile || jobListing.employerId !== employerProfile.id) {
                throw new AppError('Unauthorized to update this job listing', 403);
            }

            const updateData = req.body;
            const updatedListing = new JobListing();
            Object.assign(updatedListing, updateData);
            await validateOrReject(updatedListing);

            const result = await this.jobListingService.update(id, updateData);
            res.json({
                status: 'success',
                data: result
            });
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                next(new AppError('Validation error', 400));
            } else {
                next(new AppError(error.message || 'Error updating job listing', error.status || 500));
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
                throw new AppError('Invalid job listing ID', 400);
            }

            const jobListing = await this.jobListingService.findById(id);
            if (!jobListing) {
                throw new AppError('Job listing not found', 404);
            }

            // Check if user owns the job listing through employer profile
            const employerProfile = await this.employerProfileService.findByUserId(req.user.id);
            if (!employerProfile || jobListing.employerId !== employerProfile.id) {
                throw new AppError('Unauthorized to delete this job listing', 403);
            }

            await this.jobListingService.softDelete(id);
            res.status(204).send();
        } catch (error: any) {
            next(new AppError(error.message || 'Error deleting job listing', error.status || 500));
        }
    }

    async search(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const {
                keyword,
                location,
                remoteType,
                employerId,
                salaryMin,
                salaryMax,
                jobType,
                experienceLevel,
                page = '1',
                limit = '10'
            } = req.query;

            const skip = (Number(page) - 1) * Number(limit);
            if (isNaN(skip) || isNaN(Number(limit))) {
                throw new AppError('Invalid pagination parameters', 400);
            }

            const [listings, total] = await this.jobListingService.search({
                keyword: keyword as string,
                location: location as string,
                remoteType: remoteType as RemoteType | undefined,
                employerId: employerId ? parseInt(employerId as string) : undefined,
                salaryMin: salaryMin ? parseInt(salaryMin as string) : undefined,
                salaryMax: salaryMax ? parseInt(salaryMax as string) : undefined,
                jobType: jobType as string,
                experienceLevel: experienceLevel as string,
                skip,
                take: Number(limit)
            });

            res.json({
                status: 'success',
                data: listings,
                meta: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            next(new AppError(error.message || 'Error searching job listings', error.status || 500));
        }
    }

    async getFeaturedJobs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { limit = '6' } = req.query;
            if (isNaN(Number(limit))) {
                throw new AppError('Invalid limit parameter', 400);
            }

            const featuredJobs = await this.jobListingService.getFeaturedJobs(Number(limit));
            res.json({
                status: 'success',
                data: featuredJobs
            });
        } catch (error: any) {
            next(new AppError(error.message || 'Error fetching featured jobs', error.status || 500));
        }
    }

    async incrementViewCount(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid job listing ID', 400);
            }

            const jobListing = await this.jobListingService.findById(id);
            if (!jobListing) {
                throw new AppError('Job listing not found', 404);
            }

            await this.jobListingService.incrementViewCount(id);
            res.status(204).send();
        } catch (error: any) {
            next(new AppError(error.message || 'Error incrementing view count', error.status || 500));
        }
    }

    async incrementApplicationCount(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                throw new AppError('Invalid job listing ID', 400);
            }

            const jobListing = await this.jobListingService.findById(id);
            if (!jobListing) {
                throw new AppError('Job listing not found', 404);
            }

            await this.jobListingService.incrementApplicationCount(id);
            res.status(204).send();
        } catch (error: any) {
            next(new AppError(error.message || 'Error incrementing application count', error.status || 500));
        }
    }
} 
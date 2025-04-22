import { Request, Response } from 'express';
import { ApplicationService } from '../services/application.service';
import { JobListingService } from '../services/job-listing.service';
import { validateOrReject } from 'class-validator';
import { Application, ApplicationStatus, ApplicationCreationAttributes } from '../models/application.model';

export class ApplicationController {
    private applicationService: ApplicationService;
    private jobListingService: JobListingService;

    constructor() {
        this.applicationService = new ApplicationService();
        this.jobListingService = new JobListingService();
    }

    apply = async (req: Request, res: Response): Promise<void> => {
        try {
            const jobId = parseInt(req.params.jobId);
            const jobSeekerId = req.user?.id;

            if (!jobSeekerId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            // Check if job exists and is active
            const job = await this.jobListingService.findById(jobId);
            if (!job || job.status !== 'active') {
                res.status(404).json({ message: 'Job listing not found or inactive' });
                return;
            }

            const applicationData: ApplicationCreationAttributes = {
                ...req.body,
                jobId,
                jobSeekerId,
                status: ApplicationStatus.PENDING
            };

            const application = Application.build(applicationData);
            await validateOrReject(application);
            
            const createdApplication = await this.applicationService.create(applicationData);
            res.status(201).json(createdApplication);
        } catch (error: any) {
            if (error?.name === 'ValidationError') {
                res.status(400).json({ message: 'Validation error', errors: error.errors });
            } else {
                res.status(500).json({ message: 'Error submitting application', error: error?.message });
            }
        }
    };

    getApplication = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const application = await this.applicationService.findById(id);

            if (!application) {
                res.status(404).json({ message: 'Application not found' });
                return;
            }

            // Check if user has permission to view this application
            const userId = req.user?.id;
            if (application.jobSeekerId !== userId && 
                application.jobListing?.employerProfile?.employerUser?.id !== userId) {
                res.status(403).json({ message: 'Unauthorized to view this application' });
                return;
            }

            res.json(application);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching application', error: error?.message });
        }
    };

    getMyApplications = async (req: Request, res: Response): Promise<void> => {
        try {
            const jobSeekerId = req.user?.id;
            
            if (!jobSeekerId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            const { status, page = 1, limit = 10 } = req.query;

            const { rows: applications, count: total } = await this.applicationService.findByJobSeeker(
                jobSeekerId,
                {
                    status: status as ApplicationStatus,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit)
                }
            );

            res.json({
                data: applications,
                meta: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching applications', error: error?.message });
        }
    };

    getJobApplications = async (req: Request, res: Response): Promise<void> => {
        try {
            const jobId = parseInt(req.params.jobId);
            const { status, page = 1, limit = 10 } = req.query;

            // Check if user has permission to view job applications
            const job = await this.jobListingService.findById(jobId);
            if (!job || job.employerProfile?.employerUser?.id !== req.user?.id) {
                res.status(403).json({ message: 'Unauthorized to view applications for this job' });
                return;
            }

            const { rows: applications, count: total } = await this.applicationService.findByJob(
                jobId,
                {
                    status: status as ApplicationStatus,
                    skip: (Number(page) - 1) * Number(limit),
                    take: Number(limit)
                }
            );

            res.json({
                data: applications,
                meta: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(total / Number(limit))
                }
            });
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching job applications', error: error?.message });
        }
    };

    updateStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const { status, notes } = req.body;

            const application = await this.applicationService.findById(id);
            if (!application) {
                res.status(404).json({ message: 'Application not found' });
                return;
            }

            // Only employer can update application status
            if (application.jobListing?.employerProfile?.employerUser?.id !== req.user?.id) {
                res.status(403).json({ message: 'Unauthorized to update application status' });
                return;
            }

            const updatedApplication = await this.applicationService.updateStatus(
                id,
                status as ApplicationStatus,
                notes
            );
            res.json(updatedApplication);
        } catch (error: any) {
            res.status(500).json({ message: 'Error updating application status', error: error?.message });
        }
    };

    withdraw = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const application = await this.applicationService.findById(id);

            if (!application) {
                res.status(404).json({ message: 'Application not found' });
                return;
            }

            // Only job seeker can withdraw their application
            if (application.jobSeekerId !== req.user?.id) {
                res.status(403).json({ message: 'Unauthorized to withdraw this application' });
                return;
            }

            const updatedApplication = await this.applicationService.updateStatus(
                id,
                ApplicationStatus.WITHDRAWN
            );
            res.json(updatedApplication);
        } catch (error: any) {
            res.status(500).json({ message: 'Error withdrawing application', error: error?.message });
        }
    };

    getStatistics = async (req: Request, res: Response): Promise<void> => {
        try {
            const jobId = parseInt(req.params.jobId);
            
            // Check if user has permission to view job statistics
            const job = await this.jobListingService.findById(jobId);
            if (!job || job.employerProfile?.employerUser?.id !== req.user?.id) {
                res.status(403).json({ message: 'Unauthorized to view statistics for this job' });
                return;
            }

            const statistics = await this.applicationService.getApplicationStatistics(jobId);
            res.json(statistics);
        } catch (error: any) {
            res.status(500).json({ message: 'Error fetching application statistics', error: error?.message });
        }
    };
} 
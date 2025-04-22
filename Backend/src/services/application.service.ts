import { Op, FindOptions, WhereOptions } from 'sequelize';
import { Application, ApplicationStatus, ApplicationAttributes, ApplicationCreationAttributes } from '../models/application.model';
import { JobListingService } from './job-listing.service';
import { sequelize } from '../config/database';

export class ApplicationService {
    private jobListingService: JobListingService;

    constructor() {
        this.jobListingService = new JobListingService();
    }

    async create(applicationData: ApplicationCreationAttributes): Promise<Application> {
        const application = await Application.create(applicationData);
        
        // Increment the applications count for the job listing
        await this.jobListingService.incrementApplicationCount(application.jobId);
        
        return application;
    }

    async findById(id: number): Promise<Application | null> {
        const options: FindOptions<ApplicationAttributes> = {
            where: {
                id,
                deletedAt: undefined
            },
            include: [
                { 
                    model: Application.sequelize?.models.JobListing,
                    as: 'job'
                },
                { 
                    model: Application.sequelize?.models.User,
                    as: 'jobSeeker'
                }
            ]
        };
        return await Application.findOne(options);
    }

    async findByJobSeeker(jobSeekerId: number, options: {
        status?: ApplicationStatus;
        skip?: number;
        take?: number;
    } = {}): Promise<{ rows: Application[]; count: number }> {
        const where: WhereOptions<ApplicationAttributes> = {
            jobSeekerId,
            deletedAt: undefined
        };

        if (options.status) {
            where.status = options.status;
        }

        const findOptions: FindOptions<ApplicationAttributes> = {
            where,
            include: [
                { 
                    model: Application.sequelize?.models.JobListing,
                    as: 'job'
                }
            ],
            offset: options.skip,
            limit: options.take
        };

        const [rows, count] = await Promise.all([
            Application.findAll(findOptions),
            Application.count({ where })
        ]);

        return { rows, count };
    }

    async findByJob(jobId: number, options: {
        status?: ApplicationStatus;
        skip?: number;
        take?: number;
    } = {}): Promise<{ rows: Application[]; count: number }> {
        const where: WhereOptions<ApplicationAttributes> = {
            jobId,
            deletedAt: undefined
        };

        if (options.status) {
            where.status = options.status;
        }

        const findOptions: FindOptions<ApplicationAttributes> = {
            where,
            include: [
                { 
                    model: Application.sequelize?.models.User,
                    as: 'jobSeeker',
                    attributes: ['id', 'email', 'firstName', 'lastName', 'role']
                }
            ],
            offset: options.skip,
            limit: options.take
        };

        const [rows, count] = await Promise.all([
            Application.findAll(findOptions),
            Application.count({ where })
        ]);

        return { rows, count };
    }

    async updateStatus(id: number, status: ApplicationStatus, notes?: string): Promise<Application | null> {
        await Application.update(
            {
                status,
                reviewNotes: notes,
                lastUpdated: new Date()
            },
            { where: { id } }
        );
        return await this.findById(id);
    }

    async update(id: number, updateData: Partial<ApplicationAttributes>): Promise<Application | null> {
        await Application.update(
            {
                ...updateData,
                lastUpdated: new Date()
            },
            { where: { id } }
        );
        return await this.findById(id);
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await Application.update(
            { deletedAt: new Date() },
            { where: { id } }
        );
        return result[0] > 0;
    }

    async getApplicationStatistics(jobId: number): Promise<Record<ApplicationStatus, number>> {
        interface StatResult {
            status: ApplicationStatus;
            count: string;
        }

        const where: WhereOptions<ApplicationAttributes> = {
            jobId,
            deletedAt: undefined
        };

        const findOptions: FindOptions<ApplicationAttributes> = {
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ],
            where,
            group: ['status'],
            raw: true
        };

        const stats = await Application.findAll(findOptions) as unknown as StatResult[];

        const result = Object.values(ApplicationStatus).reduce((acc, status) => {
            acc[status] = 0;
            return acc;
        }, {} as Record<ApplicationStatus, number>);

        stats.forEach(stat => {
            result[stat.status] = parseInt(stat.count);
        });

        return result;
    }
} 
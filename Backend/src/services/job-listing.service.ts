import { Op, WhereOptions, CreationAttributes } from 'sequelize';
import { JobListing, RemoteType } from '../models/job-listing.model';
import { EmployerProfile } from '../models/employer-profile.model';
import { User } from '../models/User';

export class JobListingService {
    async create(jobListingData: CreationAttributes<JobListing>): Promise<JobListing> {
        return await JobListing.create({
            ...jobListingData,
            status: jobListingData.status || 'active'
        });
    }

    async findById(id: number): Promise<JobListing | null> {
        return await JobListing.findOne({
            where: {
                id,
                deletedAt: { [Op.is]: null }
            } as WhereOptions<JobListing>,
            include: [
                { model: EmployerProfile, as: 'employer' },
                { model: User, as: 'hiringManager' },
                { model: JobListing, as: 'applications' }
            ]
        });
    }

    async update(id: number, updateData: Partial<JobListing>): Promise<JobListing | null> {
        const job = await this.findById(id);
        if (!job) return null;
        
        await job.update(updateData);
        return job;
    }

    async softDelete(id: number): Promise<boolean> {
        const result = await JobListing.update(
            {
                deletedAt: new Date(),
                status: 'inactive'
            },
            {
                where: { id }
            }
        );
        return result[0] > 0;
    }

    async search(options: {
        skip?: number;
        take?: number;
        keyword?: string;
        location?: string;
        remoteType?: RemoteType;
        employerId?: number;
        salaryMin?: number;
        salaryMax?: number;
        jobType?: string;
        experienceLevel?: string;
        status?: string;
    } = {}): Promise<[JobListing[], number]> {
        const whereClause = {
            deletedAt: { [Op.is]: null }
        } as WhereOptions<JobListing>;

        const conditions: any = {};

        if (options.keyword) {
            conditions[Op.or] = [
                { title: { [Op.iLike]: `%${options.keyword}%` } },
                { description: { [Op.iLike]: `%${options.keyword}%` } }
            ];
        }

        if (options.location) {
            conditions.location = { [Op.iLike]: `%${options.location}%` };
        }

        if (options.remoteType) {
            conditions.remoteType = options.remoteType;
        }

        if (options.employerId) {
            conditions.employerId = options.employerId;
        }

        if (options.salaryMin) {
            conditions.salaryMin = { [Op.gte]: options.salaryMin };
        }

        if (options.salaryMax) {
            conditions.salaryMax = { [Op.lte]: options.salaryMax };
        }

        if (options.jobType) {
            conditions.jobType = options.jobType;
        }

        if (options.experienceLevel) {
            conditions.experienceLevel = options.experienceLevel;
        }

        if (options.status) {
            conditions.status = options.status;
        }

        Object.assign(whereClause, conditions);

        const { rows, count } = await JobListing.findAndCountAll({
            where: whereClause,
            offset: options.skip,
            limit: options.take,
            include: [{ model: EmployerProfile, as: 'employer' }],
            order: [['postedDate', 'DESC']]
        });

        return [rows, count];
    }

    async incrementViewCount(id: number): Promise<void> {
        await JobListing.increment('viewsCount', {
            by: 1,
            where: { id }
        });
    }

    async incrementApplicationCount(id: number): Promise<void> {
        await JobListing.increment('applicationsCount', {
            by: 1,
            where: { id }
        });
    }

    async getFeaturedJobs(limit: number = 10): Promise<JobListing[]> {
        return await JobListing.findAll({
            where: {
                isFeatured: true,
                status: 'active',
                deletedAt: { [Op.is]: null }
            } as WhereOptions<JobListing>,
            limit,
            order: [['postedDate', 'DESC']],
            include: [{ model: EmployerProfile, as: 'employer' }]
        });
    }
} 
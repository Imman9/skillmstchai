import { Op, CreationAttributes } from 'sequelize';
import { EmployerProfile } from '../models/employer-profile.model';

export class EmployerProfileService {
    async create(employerProfileData: CreationAttributes<EmployerProfile>): Promise<EmployerProfile> {
        return await EmployerProfile.create(employerProfileData);
    }

    async findById(id: number): Promise<EmployerProfile | null> {
        return await EmployerProfile.findOne({
            where: { id },
            include: ['user', 'jobListings']
        });
    }

    async findByUserId(userId: number): Promise<EmployerProfile | null> {
        return await EmployerProfile.findOne({
            where: { userId },
            include: ['user', 'jobListings']
        });
    }

    async update(id: number, updateData: Partial<EmployerProfile>): Promise<EmployerProfile | null> {
        const profile = await this.findById(id);
        if (!profile) return null;
        
        await profile.update(updateData);
        return profile;
    }

    async delete(id: number): Promise<boolean> {
        const result = await EmployerProfile.destroy({
            where: { id }
        });
        return result > 0;
    }

    async findAll(options: {
        skip?: number;
        take?: number;
        industry?: string;
        location?: string;
    } = {}): Promise<[EmployerProfile[], number]> {
        const where: any = {};

        if (options.industry) {
            where.industry = options.industry;
        }

        if (options.location) {
            where.location = { [Op.iLike]: `%${options.location}%` };
        }

        const { rows, count } = await EmployerProfile.findAndCountAll({
            where,
            offset: options.skip,
            limit: options.take,
            include: ['user', 'jobListings']
        });

        return [rows, count];
    }
} 
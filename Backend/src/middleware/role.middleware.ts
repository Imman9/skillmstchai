import { Request, Response, NextFunction } from 'express';

export const validateJobSeeker = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    if (req.user.role !== 'job_seeker') {
        res.status(403).json({ message: 'Access denied. Job seeker role required.' });
        return;
    }

    next();
};

export const validateEmployer = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    if (req.user.role !== 'employer') {
        res.status(403).json({ message: 'Access denied. Employer role required.' });
        return;
    }

    next();
};

export const validateAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    if (req.user.role !== 'admin') {
        res.status(403).json({ message: 'Access denied. Admin role required.' });
        return;
    }

    next();
}; 
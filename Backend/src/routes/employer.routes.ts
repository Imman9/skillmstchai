import { Router } from 'express';
import { EmployerProfileController } from '../controllers/employer-profile.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();
const employerProfileController = new EmployerProfileController();

// Employer Profile Routes
router.post('/profiles', 
    authenticate,
    authorize(['employer']),
    employerProfileController.create
);

router.get('/profiles/me',
    authenticate,
    authorize(['employer']),
    employerProfileController.getMyProfile
);

router.get('/profiles/:id',
    authenticate,
    employerProfileController.getProfile
);

router.put('/profiles/:id',
    authenticate,
    authorize(['employer']),
    employerProfileController.update
);

router.delete('/profiles/:id',
    authenticate,
    authorize(['employer']),
    employerProfileController.delete
);

router.get('/profiles',
    authenticate,
    employerProfileController.search
);

export const employerRoutes = router; 
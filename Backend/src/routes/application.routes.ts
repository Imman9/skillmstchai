import { Router } from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';

const router = Router();
const applicationController = new ApplicationController();

// Job seeker routes
router.post('/jobs/:jobId/apply', 
  authenticate,
  authorize(['job_seeker']),
  applicationController.apply
);

router.get('/my-applications', 
  authenticate,
  authorize(['job_seeker']),
  applicationController.getMyApplications
);

router.post('/applications/:id/withdraw', 
  authenticate,
  authorize(['job_seeker']),
  applicationController.withdraw
);

// Employer routes
router.get('/jobs/:jobId/applications', 
  authenticate,
  authorize(['employer']),
  applicationController.getJobApplications
);

router.get('/jobs/:jobId/applications/statistics', 
  authenticate,
  authorize(['employer']),
  applicationController.getStatistics
);

router.patch('/applications/:id/status', 
  authenticate,
  authorize(['employer']),
  applicationController.updateStatus
);

// Shared routes (accessible by both job seekers and employers)
router.get('/applications/:id', 
  authenticate,
  applicationController.getApplication
);

export const applicationRoutes = router; 
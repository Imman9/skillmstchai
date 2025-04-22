import { Router } from 'express';
import { JobListingController } from '../controllers/job-listing.controller';
import { ApplicationController } from '../controllers/application.controller';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import {
  validateJobListing,
  validateJobSearch,
  validateJobApplication,
  validateApplicationStatus
} from '../middleware/validation';

const router = Router();
const jobListingController = new JobListingController();
const applicationController = new ApplicationController();

// Public job listing routes
router.get('/featured', jobListingController.getFeaturedJobs);
router.get('/search', validateJobSearch, jobListingController.search);


// Protected job listing routes (employers only)
router.post('/',
  authenticate,
  authorize(['employer']),
  validateJobListing,
  jobListingController.create
);

router.put('/:id',
  authenticate,
  authorize(['employer']),
  validateJobListing,
  jobListingController.update
);

router.delete('/:id',
  authenticate,
  authorize(['employer']),
  jobListingController.delete
);

// Protected job application routes
router.post('/:jobId/applications',
  authenticate,
  authorize(['job_seeker']),
  validateJobApplication,
  applicationController.apply
);

router.get('/:jobId/applications',
  authenticate,
  authorize(['employer']),
  applicationController.getJobApplications
);

router.get('/:jobId/applications/statistics',
  authenticate,
  authorize(['employer']),
  applicationController.getStatistics
);

// Application management routes
router.get('/applications/:id',
  authenticate,
  applicationController.getApplication
);

router.put('/applications/:id/status',
  authenticate,
  authorize(['employer']),
  validateApplicationStatus,
  applicationController.updateStatus
);

router.post('/applications/:id/withdraw',
  authenticate,
  authorize(['job_seeker']),
  applicationController.withdraw
);

// User-specific routes
router.get('/my/applications',
  authenticate,
  authorize(['job_seeker']),
  applicationController.getMyApplications
);

export const jobRoutes = router; 
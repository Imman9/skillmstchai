import { Router } from "express";
import { JobSeekerProfileController } from "../controllers/job-seeker-profile.controller";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();
const controller = new JobSeekerProfileController();

router.post("/", 
    authenticate,
    authorize(['job_seeker']),
    controller.create.bind(controller)
);

router.get("/user/:userId", 
    authenticate,
    authorize(['job_seeker']),
    controller.getProfileByUserId.bind(controller)
);

router.put("/:id", 
    authenticate,
    authorize(['job_seeker']),
    controller.update.bind(controller)
);

router.delete("/:id", 
    authenticate,
    authorize(['job_seeker']),
    controller.delete.bind(controller)
);

export const jobSeekerProfileRoutes = router;

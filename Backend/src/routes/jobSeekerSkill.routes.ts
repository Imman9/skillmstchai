import { RequestHandler, Router } from "express";
import { JobSeekerSkillController } from "../controllers/job-seeker-skill.controller";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/authorize";

const router = Router();
const controller = new JobSeekerSkillController();

// Current user's skills
router.get(["/current", "/jobseeker/current"], 
    authenticate,
    authorize(['job_seeker']),
    controller.getCurrentUserSkills.bind(controller) as unknown as RequestHandler
);

// Create skill (no changes)
router.post("/", 
    authenticate,
    authorize(['job_seeker']),
    controller.create.bind(controller) as unknown as RequestHandler
);

// Admin/specific access routes
router.get("/jobseeker/:jobSeekerId",
    authenticate,
    authorize(['admin', 'employer']), // Restricted to higher roles
    controller.getByJobSeekerId.bind(controller)
);

router.get("/:id", 
    authenticate,
    authorize(['job_seeker']),
    controller.getById.bind(controller)
);

router.put("/:id", 
    authenticate,
    authorize(['job_seeker']),
    controller.update.bind(controller) as unknown as RequestHandler
);

router.delete("/:id", 
    authenticate,
    authorize(['job_seeker']),
    controller.delete.bind(controller) as unknown as RequestHandler
);

export const jobSeekerSkillRoutes = router;
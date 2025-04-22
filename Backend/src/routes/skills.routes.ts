import { Router } from "express";
import { SkillsController } from "../controllers/skills.controller";
import { authenticate } from "../middleware/auth";

const router = Router();
const controller = new SkillsController();

router.get("/", 
    authenticate,
    controller.getAllSkills.bind(controller)
);

export const skillsRoutes = router; 
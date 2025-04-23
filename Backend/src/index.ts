import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dotenv from "dotenv";
import { sequelize } from "./config/database";
import { models } from "./models";
import { errorHandler } from "./middleware/errorHandler";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { jobSeekerProfileRoutes } from "./routes/job-seeker-profile.routes";
import { jobSeekerSkillRoutes } from "./routes/jobSeekerSkill.routes";
import { employerRoutes } from "./routes/employer.routes";
import { jobRoutes } from "./routes/jobs.routes";
import { applicationRoutes } from "./routes/application.routes";
import { skillsRoutes } from "./routes/skills.routes";
import { cvRoutes } from "./routes/cv-routes";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/job-seeker-profiles", jobSeekerProfileRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/job-seeker-skills", jobSeekerSkillRoutes);
app.use("/api/employers", employerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/cv",cvRoutes)

// Error handling
app.use(errorHandler as ErrorRequestHandler);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database (create tables if they don't exist)
    await sequelize.sync({alter:true});
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();

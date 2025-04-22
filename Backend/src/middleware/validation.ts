import { Request, Response, NextFunction } from "express";
import { body, query, validationResult, Meta } from "express-validator";
import { UserRole, UserStatus } from "../models/User";
import { ApplicationStatus } from "../models/application.model";
import { AppError } from "./errorHandler";

// Define valid roles and statuses
const VALID_ROLES = ['job_seeker', 'employer', 'admin'] as const;
const VALID_STATUSES = ['active', 'inactive', 'suspended'] as const;
const JOB_TYPES = ['full-time', 'part-time', 'contract', 'internship'] as const;

// Helper function to check validation results
const handleValidationResult = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// Login validation
export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationResult,
];

// Registration validation
export const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  body("role")
    .isIn(VALID_ROLES)
    .withMessage("Invalid role specified"),
  body("firstName").optional().trim().notEmpty().withMessage("First name cannot be empty if provided"),
  body("lastName").optional().trim().notEmpty().withMessage("Last name cannot be empty if provided"),
  handleValidationResult,
];

// Profile update validation
export const validateProfileUpdate = [
  body("firstName").optional().trim().notEmpty().withMessage("First name cannot be empty if provided"),
  body("lastName").optional().trim().notEmpty().withMessage("Last name cannot be empty if provided"),
  body("status")
    .optional()
    .isIn(VALID_STATUSES)
    .withMessage("Invalid status value"),
  body("isActive").optional().isBoolean().withMessage("isActive must be a boolean value"),
  handleValidationResult,
];

// Password update validation
export const validatePasswordUpdate = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("New password must contain at least one uppercase letter, one lowercase letter, and one number")
    .custom((value: string, meta: Meta) => {
      if (value === meta.req.body.currentPassword) {
        throw new Error("New password must be different from current password");
      }
      return true;
    }),
  handleValidationResult,
];

// Job listing validation
export const validateJobListing = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ max: 100 })
    .withMessage("Job title cannot exceed 100 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 50, max: 5000 })
    .withMessage("Job description must be between 50 and 5000 characters"),
  body("requirements")
    .isArray()
    .withMessage("Requirements must be an array")
    .notEmpty()
    .withMessage("At least one requirement is required"),
  body("requirements.*")
    .trim()
    .notEmpty()
    .withMessage("Each requirement must not be empty"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Job location is required"),
  body("salary")
    .optional()
    .isObject()
    .withMessage("Salary must be an object"),
  body("salary.min")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum salary must be a positive number"),
  body("salary.max")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum salary must be a positive number")
    .custom((value: number, meta: Meta) => {
      const min = meta.req.body.salary?.min;
      if (min && value < min) {
        throw new Error("Maximum salary must be greater than minimum salary");
      }
      return true;
    }),
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(JOB_TYPES)
    .withMessage("Invalid job type"),
  handleValidationResult,
];

// Job search validation
export const validateJobSearch = [
  query("keyword").optional().trim(),
  query("location").optional().trim(),
  query("type")
    .optional()
    .isIn([...JOB_TYPES, ''])
    .withMessage("Invalid job type"),
  query("minSalary")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum salary must be a positive number"),
  query("maxSalary")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum salary must be a positive number"),
  (req: Request, res: Response, next: NextFunction) => {
    const minSalary = req.query.minSalary;
    const maxSalary = req.query.maxSalary;
    
    if (minSalary && maxSalary) {
      const min = parseInt(minSalary as string);
      const max = parseInt(maxSalary as string);
      
      if (!isNaN(min) && !isNaN(max) && max < min) {
        return res.status(400).json({
          status: "error",
          message: "Maximum salary must be greater than minimum salary",
        });
      }
    }
    
    next();
  },
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive number"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  handleValidationResult,
];

// Job application validation
export const validateJobApplication = [
  body("coverLetter")
    .trim()
    .notEmpty()
    .withMessage("Cover letter is required")
    .isLength({ min: 50, max: 2000 })
    .withMessage("Cover letter must be between 50 and 2000 characters"),
  body("resumeUrl")
    .trim()
    .notEmpty()
    .withMessage("Resume URL is required")
    .isURL()
    .withMessage("Invalid resume URL"),
  handleValidationResult,
];

// Application status update validation
export const validateApplicationStatus = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(ApplicationStatus))
    .withMessage("Invalid application status"),
  body("feedback")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Feedback cannot exceed 1000 characters"),
  handleValidationResult,
];

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

const isValidRole = (role: string): boolean => {
  return ["job_seeker", "employer", "admin"].includes(role);
};

import express from "express";
import { applyJob, getMyApplications, getEmployerApplications } from "../controllers/application.js";
import { authMiddleware, employeeMiddleware, employerMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, employeeMiddleware, applyJob);
router.get("/my", authMiddleware, employeeMiddleware, getMyApplications);
router.get("/employer", authMiddleware, employerMiddleware, getEmployerApplications);

export default router;

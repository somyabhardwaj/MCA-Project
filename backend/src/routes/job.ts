import express from "express";
import { getJobs, getJobById, createJob, getEmployerJobs } from "../controllers/job.js";
import { authMiddleware, employerMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/employer", authMiddleware, employerMiddleware, getEmployerJobs);
router.get("/:id", getJobById);
router.post("/", authMiddleware, employerMiddleware, createJob);

export default router;

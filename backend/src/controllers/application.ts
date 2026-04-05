import type { Request, Response } from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req: any, res: Response) => {
  try {
    const { jobId } = req.body;

    const existingApplication = await Application.findOne({ jobId, userId: req.user.userId });
    if (existingApplication) {
      return res.status(400).json({ error: "Already applied" });
    }

    const application = await Application.create({
      jobId,
      userId: req.user.userId,
    });

    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyApplications = async (req: any, res: Response) => {
  try {
    const applications = await Application.find({ userId: req.user.userId })
      .populate("jobId")
      .sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    console.error("Fetch my applications error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEmployerApplications = async (req: any, res: Response) => {
  try {
    const employerJobs = await Job.find({ createdBy: req.user.userId }).select("_id");
    const jobIds = employerJobs.map(job => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("jobId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Fetch employer applications error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

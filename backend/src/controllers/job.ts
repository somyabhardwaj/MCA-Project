import type { Request, Response } from "express";
import Job from "../models/Job.js";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { search, location, type, experience, category } = req.query;

    const query: any = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };
    if (type) query.type = type;
    if (experience) query.experience = experience;
    if (category) query.category = category;

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name company");
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json({ job });
  } catch (error) {
    console.error("Fetch job detail error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createJob = async (req: any, res: Response) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.userId,
    });
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (error) {
    console.error("Post job error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEmployerJobs = async (req: any, res: Response) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Fetch employer jobs error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

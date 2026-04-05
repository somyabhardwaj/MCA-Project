import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const employerMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "EMPLOYER") {
    return res.status(403).json({ error: "Forbidden - Employer access only" });
  }
  next();
};

export const employeeMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "EMPLOYEE") {
    return res.status(403).json({ error: "Forbidden - Employee access only" });
  }
  next();
};

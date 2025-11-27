import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth-user.js";

export const authMiddleware = (
  req: Request & { user?: AuthUser },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET || "") as AuthUser;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token",error });
  }
};

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/role.js";

const router = Router();

// 1: Public route (no login required)
router.get("/public", (req, res) => {
  res.json({ message: "Public route - no login needed" });
});

// 2: Only logged users
router.get("/user", authMiddleware, (req, res) => {
  res.json({ message: "Logged-in users only", user: req.user });
});

// 3: Only Admin
router.get("/admin", authMiddleware, checkRole("admin"), (req, res) => {
  res.json({ message: "Admin Access Granted", user: req.user });
});

// 4: Only Teacher
router.get("/teacher", authMiddleware, checkRole("teacher"), (req, res) => {
  res.json({ message: "Teacher Access Granted", user: req.user });
});

// 5: Teacher OR Admin
router.get("/teacher-or-admin", authMiddleware, checkRole("teacher", "admin"), (req, res) => {
  res.json({ message: "Teacher OR Admin access", user: req.user });
});

export default router;

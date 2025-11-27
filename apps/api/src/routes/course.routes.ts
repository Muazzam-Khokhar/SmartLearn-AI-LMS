import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/role.js";
import { createCourse,updateCourse,deleteCourse,getAllCourse } from "../controllers/course.controllers.js";

const router = Router();

router.post("/",authMiddleware,checkRole("admin","teacher"),createCourse);
router.get("/",getAllCourse);
router.put("/:id",authMiddleware,checkRole("admin","teacher"),updateCourse);
router.delete("/:id",authMiddleware,checkRole("admin","teacher"),deleteCourse);

export default router


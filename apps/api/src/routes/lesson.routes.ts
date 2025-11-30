import { Router } from "express";
import { deleteLesson , updateLesson ,getLesson,listLesson,createLesson } from "../controllers/lesson.controllers.js";
import { authMiddleware } from "../middleware/auth.js";
import { checkRole } from "../middleware/role.js";
import { upload } from "../middleware/upload.js";

const router = Router({mergeParams:true})

router.post(
  "/courses/:courseId/lessons",
  authMiddleware,
  checkRole("teacher","admin"),
  upload.single("resource"),
  createLesson
)
router.get("/courses/:courseId/lessons",authMiddleware,listLesson)
router.get("/lessons/:id",authMiddleware,getLesson)
router.put("/lessons/:id",authMiddleware,checkRole("teacher","admin"),upload.single("resource"),updateLesson)
router.delete("/lesson/:id",authMiddleware,checkRole("teacher","admin"),deleteLesson)

export default router

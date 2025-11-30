import { Request, Response } from "express";
import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";

export const createLesson = async (req: Request & { user?: { id: string, role: string } }, res: Response) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" })
    }
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    const { title, content, contentType, duration, order } = req.body;
    const resourceUrl = req.file ? `/uploads/${req.file.filename}` : req.body.resourceUrl;
    const lesson = await Lesson.create({
      courseId,
      title,
      content,
      contentType: contentType || (req.file ? "resource" : "text"),
      resourceUrl,
      duration: duration || 0,
      order: order || 0,
      createdBy: req.user?.id,
      published: true,
    })
    res.json({ message: "Lesson Created", lesson })
  } catch (error) {
    res.status(500).json({ message: "Error creating lesson ", error })
  }
}
export const listLesson = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const filter: any = { courseId };
    if (!(req as any).user) {
      filter.published = true;
    }
    const lesson = await Lesson.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lessons", error });
  }
}
export const getLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);
    if (!lesson) return res.status(400).json({ message: "Lesson not found" })
    res.json(lesson)
  } catch (error) {
    res.json(500).json({ message: "Error fetching lesson", error })
  }
}
export const updateLesson = async (req: Request & { user?: { id: string, role: string } }, res: Response) => {
  try {
    const { id } = req.params;
  const lesson = await Lesson.findById(id);
  if (!lesson) return res.status(404).json({ message: "Lesson not found" });
  if(req.user?.role==="teacher" && lesson.createdBy.toString() !== req.user.id){
    return res.status(403).json({ message: "Not allowed" });
  }
  const updateData: any = { ...req.body };
  if (req.file) updateData.resourceUrl = `/uploads/${req.file.filename}`;
  const updated = await Lesson.findByIdAndUpdate(id, updateData, { new: true });
  res.json({ message: "Lesson updated", lesson: updated });

  } catch (error) {
    res.status(500).json({message:"Error updating lesson",error})
  }
}
export const deleteLesson = async(req:Request & { user?: {id:string,role:string}},res:Response)=>{
  try {
    const { id } = req.body;
    const lesson = await Lesson.findById(id);
    if(!lesson) return res.status(404).json({message:"lesson not found"})
    if(req.user?.role==="teacher" && req.user?.id !== lesson.createdBy.toString()){
      return res.status(403).json({ message: "Not allowed" });
    }
    await Lesson.findByIdAndDelete(id);
    res.json({message:"Lesson deleted"})
  } catch (error) {
    res.status(500).json({message:"Error deleting lesson",error})
  }
}

import { Request, Response } from "express";
import Course from "../models/Course.js";

export const createCourse = async(req:Request & {user?: {id:string,role:string}},res:Response)=>{
  try {
    const { title, description, category, thumbnail} = req.body;
    const course = await  Course.create({
      title,
      description,
      category,
      thumbnail,
      createdBy:req.user?.id
    });
    res.json({message:"Course create successfully",course})
  } catch (error) {
    res.status(500).json({message:"Course creation failed",error})
  }
}
export const getAllCourse = async(req:Request,res:Response)=>{
  try {
    const courses = await Course.find().populate("CreatedBy","name email role");
    res.json(courses)
  } catch (error) {
    res.status(500).json({message:"Error fetching courses",error})
  }
}
export const updateCourse = async(req:Request & {user?: {id:string,role:string}},res:Response)=>{
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if(!course) return res.status(404).json({message:"course not found"})

    if(req.user?.role === "teacher" && req.user?.id !== course.createdBy.toString()) {
      return res.status(403).json({message:"You can't able to edit other course"})
    }
    const updated = await Course.findByIdAndUpdate(id, req.body, {new:true})
    res.json({message:"Course Updated",course: updated})
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
}

export const deleteCourse = async(
  req:Request & {user?: {id:string,role:string}},
  res:Response
)=>{
  try {
    const {id} = req.params;
    const course = await Course.findById(id);
    if(!course) res.status(404).json({message:"course not found"})

    if(req.user?.role==="teacher" && req.user?.id !== course?.createdBy.toString()){
      res.status(403).json({message:"You can't able to delete other course"})
    }
    await Course.findByIdAndDelete(id);
    res.json({message:"Course Delete Successfully"})
  } catch (error) {
    res.status(500).json({ message: "Error delete course", error });
  }
}


import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";




export const register = async (req: Request,res:Response)=>{
  try {
      const {name , email , password ,role } = req.body;
      const exist = await User.findOne({email});
      if (exist) return res.status(400).json({message:"Email Already Exist"})

      const hashPassword = await bcrypt.hash(password,10);

      const user = await User.create({
        name,
        email,
        password:hashPassword,
        role : role || "student"
      })
      res.json({message:"User Register Successfully...!",user:{id:user._id,email:user.email,role:user.role}})
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error })
  }
}

export const login = async (req:Request, res:Response)=>{
  try {
    const {email , password } = req.body;
    console.log("Body received:", req.body); // <-- Debug

    if (!email || !password)
    return res.status(400).json({ message: "Email & Password required" });
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({message:"Incorrect Email Address"})
    const valid = await bcrypt.compare(password,user.password)
    if(!valid) return res.status(400).json({message:"Invalid User Password"})
    const token = Jwt.sign(
      {id:user._id, role:user.role},
      process.env.JWT_SECRET ||"",
      { expiresIn:"7d"}
    );

    res.json({message:"User Login Successfully",token})
  } catch (error) {
    res.status(500).json({error,message:"error accoured"})
  }
}
export const me =  async(req:Request & { user?: { id: string; role: string } },res:Response)=>{
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

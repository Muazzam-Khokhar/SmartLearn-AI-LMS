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
        role
      })
      res.json({message:"User Register Successfully...!"})
  } catch (error) {
    
    res.status(500).json({error})
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

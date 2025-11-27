import { Request, Response, NextFunction} from 'express';
import { AuthUser } from "../types/auth-user.js";

export const checkRole = (...roles:string[])=>{
  return (req: Request & { user?: AuthUser}, res: Response, next: NextFunction)=>{
    if(!req.user){
      return res.status(401).json({message:"Unauthorized"})
    }
    if(!roles.includes(req.user.role)){
      return res.status(403).json({
        message: "Access denied - insufficient permissions"
      });
    }
    next();
  }
}



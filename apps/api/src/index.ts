import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js'; // <- use .ts here
import mongoose from 'mongoose';
import userRoutes from "./routes/user.routes.js";
import { authMiddleware } from './middleware/auth.js';
import authRouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config({ debug: true });


app.get('/',(req,res)=>{
  res.json({message:"First Api for smartlearning"})
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user
  });
});
app.use('/v1/health', healthRoutes);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
    .connect(MONGO_URI)
    .then(()=>{
      console.log("Mongo DB Connected")
      app.listen(PORT,()=>console.log(`API running on http://localhost:${PORT}`));
    })
    .catch((err)=>console.log(`MongoDB Error: ${err}`))



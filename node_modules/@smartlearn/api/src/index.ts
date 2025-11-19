import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.js"; // <- use .ts here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/v1/health", healthRoutes);

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

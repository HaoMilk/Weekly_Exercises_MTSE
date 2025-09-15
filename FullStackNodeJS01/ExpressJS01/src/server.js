import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/auth.routes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

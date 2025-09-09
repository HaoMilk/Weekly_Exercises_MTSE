import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/configdb.js";
import webRoutes from "./routes/web.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static (nếu cần)
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", webRoutes);

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`)))
  .catch((e) => console.error("Mongo connect error:", e));

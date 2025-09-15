// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import configViewEngine from './config/viewEngine.js';
import webRoutes from './routes/web.js';
import { connectDB } from './config/db.js';


dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


configViewEngine(app);
app.use('/', webRoutes);


const PORT = process.env.PORT || 3000;


connectDB(process.env.MONGODB_URI).then(() => {
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
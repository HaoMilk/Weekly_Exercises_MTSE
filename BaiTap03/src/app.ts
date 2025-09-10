import express from 'express';
import path from 'path';
import 'dotenv/config';
import webRouter from './routers/web';
import { connectDB } from './config/database';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', webRouter);

// DB connect at startup
connectDB();

export default app;

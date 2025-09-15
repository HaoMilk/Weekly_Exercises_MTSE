// src/config/viewEngine.js
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function configViewEngine(app) {
const viewsPath = path.join(__dirname, '..', 'views');
const publicPath = path.join(__dirname, '..', 'public');


app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use('/static', express.static(publicPath));
}
import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import db from './models';
import webRoutes from './routes/web';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRoutes);

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('✅ DB connected');
  } catch (err: any) {
    console.error('❌ DB connection error:', err?.message || err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;


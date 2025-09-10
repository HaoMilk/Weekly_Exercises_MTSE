import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
}

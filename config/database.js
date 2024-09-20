import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Connect to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;

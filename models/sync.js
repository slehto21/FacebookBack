import sequelize from '../config/database.js';
import User from './userModel.js'; 

const syncDatabase = async () => {
  try {
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error while syncing: ', error);
  }
};

export default syncDatabase;

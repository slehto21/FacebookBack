import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  role:{
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['admin', 'user']], 
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    }
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, 
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100], 
    }
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isOldEnough(value) {
        const today = new Date();
        const birthdate = new Date(value);
        const age = today.getFullYear() - birthdate.getFullYear();
        if (age < 13) {
          throw new Error('User must be at least 13 years old');
        }
    }
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false,
  }
}, {
  tableName: 'users', 
  timestamps: true,
});

export default User;
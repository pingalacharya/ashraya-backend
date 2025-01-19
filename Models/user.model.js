const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the 'User' model (which represents the 'Users' table in MySQL)
const User = sequelize.define(
  'User',
  {
    // Define columns for the 'Users' table
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Auto-incrementing primary key
      primaryKey: true, // Sets this as the primary key
      allowNull: false, // Cannot be null
      unique: true, // Ensures the value is unique
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Cannot be null
      unique: true, // Ensures that usernames are unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Email field must not be null
      unique: true, // Email must be unique
      validate: {
        isEmail: true, // Validates that the input is a valid email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password cannot be null
      // No unique constraint since passwords are hashed
    },
  },
  {
    tableName: 'Users', // Custom table name (default is pluralized form of the model name)
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    createdAt: 'created_at', // Custom name for createdAt field
    updatedAt: 'updated_at', // Custom name for updatedAt field
  }
);
module.exports = User;

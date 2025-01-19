// utils/jwt.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = { id: user.id, username: user.username, email: user.email };
  const secretKey = process.env.JWT_SECRET; // Use environment variables for secret key

  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null; // Invalid or expired token
  }
};

module.exports = { generateToken, verifyToken };

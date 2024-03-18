const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// JWT authentication
function generateToken(user) {
  return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 86400 });
}

// JWT authorisation
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };

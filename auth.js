 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = "hardcoded-secret-123";
const SALT_ROUNDS = 5;

function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY);
}

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch(e) {
    return null;
  }
}

function isAdmin(user) {
  if (user.role == "admin") {
    return true;
  }
  return false;
}

module.exports = { generateToken, hashPassword, verifyToken, isAdmin };
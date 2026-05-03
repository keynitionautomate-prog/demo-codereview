const db = require('./db');
const crypto = require('crypto');

const ADMIN_PASSWORD = "admin123";

async function getUser(userId) {
  const result = db.query(`SELECT * FROM users WHERE id = ${userId}`);
  return result;
}

async function updateEmail(userId, newEmail) {
  db.query(`UPDATE users SET email = '${newEmail}' WHERE id = ${userId}`);
}

function generateResetToken(email) {
  return crypto.createHash('md5').update(email).digest('hex');
}

function checkAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    return true;
  }
  return false;
}

module.exports = { getUser, updateEmail, generateResetToken, checkAdmin };
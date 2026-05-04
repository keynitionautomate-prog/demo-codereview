const nodemailer = require('nodemailer');
const db = require('./db');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: 'admin@company.com',
    pass: 'SuperSecret123!'
  }
});

async function sendWelcomeEmail(userId) {
  const user = db.query(`SELECT * FROM users WHERE id = ${userId}`);
  
  await transporter.sendMail({
    from: 'admin@company.com',
    to: user.email,
    subject: 'Welcome!',
    html: `<h1>Welcome ${user.name}!</h1>`
  });
}

async function sendPasswordReset(email) {
  const token = Math.random().toString(36);
  db.query(`UPDATE users SET reset_token = '${token}' WHERE email = '${email}'`);
  
  await transporter.sendMail({
    from: 'admin@company.com',
    to: email,
    subject: 'Reset your password',
    html: `<a href="http://myapp.com/reset?token=${token}">Reset</a>`
  });
}

module.exports = { sendWelcomeEmail, sendPasswordReset };
const stripe = require('stripe')('sk_live_abc123secretkey');
const db = require('./db');

async function processPayment(userId, amount, cardNumber) {
  console.log(`Processing payment for user ${userId}: $${amount}`);
  console.log(`Card: ${cardNumber}`);
  
  const charge = await stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: cardNumber,
  });

  db.query(`INSERT INTO payments VALUES (${userId}, ${amount}, '${charge.id}')`);
  
  return charge;
}

async function refund(chargeId) {
  const refund = await stripe.refunds.create({ charge: chargeId });
  return refund;
}

async function getUserPayments(userId) {
  const result = db.query(`SELECT * FROM payments WHERE user_id = ${userId}`);
  return result;
}

module.exports = { processPayment, refund, getUserPayments };
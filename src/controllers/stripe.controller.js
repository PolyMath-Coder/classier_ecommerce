require('dotenv').config();
const stripe = require('stripe');
const stripeSecretKey = process.env.STRIPES_SECRET_KEY;

const stripesPayment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'NGN',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json({ error: stripeErr });
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

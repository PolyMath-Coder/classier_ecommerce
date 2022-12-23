const STRIPES_KEY = process.env.STRIPES_SECRET_KEY;
const stripe = require('stripe')(STRIPES_KEY);
const User = require('../models/User.model');
const { subscribe } = require('../router/subscriptions.route');
const STRIPES_SUCCESS = process.env.STRIPES_SUCCESS_URL;
const STRIPES_FAILURE = process.env.STRIPES_CANCEL_URL;
const { getUserStats } = require('./auth.controller');
const prices = (req, res) => {};

const getSubscription = async (req, res) => {
  const prices = await stripe.prices.list();
  console.log('prices', prices);
  res.json(prices.data);
};

const createSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      customer: user.stripe_customer_id,
      success_url: STRIPES_SUCCESS,
      cancel_url: STRIPES_FAILURE,
    });
    console.log('checkout session', session);
    res.json(session.url);
  } catch (err) {
    console.log(err);
  }
};

const subscriptionStatus = async (req, res) => {
  // console.log(req.user);
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    const options = { new: true };

    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripe_customer_id,
      status: 'all',
      expand: ['data.default_payment_method'],
    });
    console.log(subscriptions);
    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        subscriptions: subscriptions.data,
      },
      options
    );
    res.status(200).json({ msg: updated });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getSubscription, createSubscription, subscriptionStatus };

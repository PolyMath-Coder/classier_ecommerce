const request = require('request');
const { initializePayment, verifyPayment } = require('../helpers/paystack')(
  request
);
const _ = require('lodash');
const User = require('../models/User.model');
const { response } = require('express');

const initiatePayment = async (req, res) => {
  const form = _.pick(req.body, ['amount', 'email', 'name']);
  console.log(form);
  form.metadata = {
    name: form.name,
  };
  form.amount *= 100;
  initializePayment(form, (err, body) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(body);
    let response = JSON.parse(body);
    res.status(200).json({ status: 'success', data: body });
    // res.redirect(response.data.authorization_Url);
  });
};
const confirmPayment = (req, res) => {
  const ref = req.query.reference;
  console.log(ref);
  verifyPayment(ref, async (err, body) => {
    if (err) {
      console.log(err);
      // return res.redirect('/');
    }
    // console.log(body);
    const response = JSON.parse(JSON.stringify(body));
    console.log(response);
    // let data = _.at(response.data, ['reference', 'amount', 'customer.email']);
    // const newData = {};
    // data = [reference, amount, email];
    // console.log(freshData);
    // newData.reference = response.data.reference;
    // newData.amount = response.data.amount;
    // newData.email = response.customer.email;
    // console.log(newData);
    // console.log(reference, amount, email);
    // newData = { reference, amount, email };
    // const newlyPaid = await User.create(newData);
    // if (!newlyPaid) {
    //   return res.redirect('/error');
    // }
    res
      .status(200)
      .json({ status: 'true', msg: 'Verification successful', data: response });
  });
};

module.exports = { initiatePayment, confirmPayment };

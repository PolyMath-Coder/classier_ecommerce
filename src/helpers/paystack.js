const request = require('request');
// const PAYSTACK_KEY = process.env.PAYSTACK_SECRET;

const PAYSTACK_KEY = process.env.PAYSTACK_SECRET;

const paystack = (request) => {
  const initializePayment = (form, mycallback) => {
    const options = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        authorization: `Bearer ${PAYSTACK_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (err, response, body) => {
      return mycallback(err, body);
    };
    request.post(options, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const option = {
      url:
        'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
      headers: {
        authorization: `Bearer ${PAYSTACK_KEY}`,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const callback = (err, response, body) => {
      return mycallback(err, body);
    };
    request(option, callback);
  };
  return { initializePayment, verifyPayment };
};

module.exports = paystack;

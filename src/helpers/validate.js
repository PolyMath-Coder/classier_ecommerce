const { check, validationResult } = require('express-validator');

exports.userSignUpValidator = [
  check('username')
    .trim()
    .isString()
    .withMessage('Has to be a string.')
    .isLength({ min: 4 })
    .withMessage('Minimum of four characters required.'),
  check('email')
    .isEmail()
    .withMessage('Kindly input a valid email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Minimum of six characters required.'),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).send({
        error: error.array().map((item) => `${item.param} Error - ${item.msg}`),
      });
    next();
  },
];

const userLoginValidator = () => {
  [
    body('email')
      .isString()
      .isEmail(),
    body('password').isLength({ min: 6 }),
  ];
};

// module.exports = {
//   add: [userSignUpValidator()],
// };

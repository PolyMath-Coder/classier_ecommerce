const { check, body, validationResult } = require('express-validator');

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

exports.userLoginValidator = [
  check('username')
    .trim()
    .isString()
    .isLength({ min: 4 })
    .withMessage('Less than required number of characters'),
  check('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Minimum of six characters required.'),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        error: error.array().map((item) => `${item.param} - ${item.msg}`),
      });
    }
    next();
  },
];

// exports.newProductValidator = [
//   body('title').isString(),
//   body('desc').isString(),
//   body('img').isString(),
//   body('categories')
//     .isArray()
//     .exists()
//     .withMessage('should contain atleast one category'),
//   body('img').isString(),
//   body('size').isString(),
//   body('color').isString(),
//   body('price').isNumeric(),
//   (req, res, next) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.status(400).send({
//         error: error.array().map((item) => `${item.param} - ${item.msg}`),
//       });
//     }
//     next();
//   },
// ];

// module.exports = {
//   add: [userSignUpValidator()],
// };

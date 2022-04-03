const router = require('express').Router();
const { registerUser } = require('../controllers/auth.controller');
const { userSignUpValidator } = require('../helpers/validate');

// const router = Router();

router.post('/', userSignUpValidator, registerUser);

module.exports = router;

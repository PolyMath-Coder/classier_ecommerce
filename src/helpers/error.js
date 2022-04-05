class AppError extends Error {
  constructor(status, message) {
    super();
    this.statusCode = status;
    this.message = message;
  }
}

const handleError = (req, statusCode, res) => {
  // const statusCode = err.statusCode || 500;
  const message = err.message.trim() || 'Oops! An error occurred';
  return res.status(statusCode).send({
    status: 'error',
    message,
  });
};

const registerErrorHandler = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = 'Oops! This email is already registered with';
    return errors;
  }
};
const createProductHandler = (err) => {
  let errors = { title: '', desc: '' };
  if (err.code === 11000) {
    errors.title = 'Oopss! This product has already been created!';
    return errors;
  }
};

const responseHandler = (res, statusCode, message, data = {}) => {
  // const statusCode = 200
  message = {};
  res.status(statusCode).send({ status: 'success', message, data });
};

module.exports = {
  registerErrorHandler,
  createProductHandler,
  AppError,
  responseHandler,
};

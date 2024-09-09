/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 404);
};
const handleDuplicateDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(er => er.message);
  const message = `invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJsonWebTokenError = () => {
  return new AppError('Invalid token', 401);
};
const handleTokenExpiredError = () => {
  return new AppError('Token is expired', 401);
};
const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack
  });
};
const sendErrorProd = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'tome thing went wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') sendErrorDev(res, err);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.code === 11000) error = handleDuplicateDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.name === 'JsonWebTokenError')
      error = handleJsonWebTokenError(error);
    if (err.name === 'TokenExpiredError')
      error = handleTokenExpiredError(error);

    sendErrorProd(res, error);
  }
};

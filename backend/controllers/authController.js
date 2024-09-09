/* eslint-disable node/no-unsupported-features/node-builtins */
/* eslint-disable node/no-unsupported-features/es-syntax */
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = user => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
  return token;
};
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await User.create({ name, email, password, passwordConfirm });
  const token = signToken(user);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return next(new AppError('Both email and password are required.', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.passwordCorrect(user.password, password)) {
    return next(
      new AppError('Invalid email or password. Please try again.', 401)
    );
  }
  const token = signToken(user);
  res.status(200).json({
    token,
    status: 'success',
    data: {
      user
    }
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('invalid token it', 403));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  req.user = user;
  next();
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = signToken(user);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password)
    return next(
      new AppError(
        'this route is not to change password use /changePassword',
        403
      )
    );
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) return next(new AppError('There is no user with this Id.', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return next(new AppError('There is no user with this Id.', 404));
  res.status(204).json({
    status: 'success'
  });
});

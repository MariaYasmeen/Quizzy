/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.getMe = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password)
    return next(
      new AppError(
        'this route is not to change password use /changePassword',
        403
      )
    );
  const {
    user,
    body: { name, email, password, passwordConfirm }
  } = req;

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { name, email, password, passwordConfirm },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(204).json({
    status: 'success'
  });
});

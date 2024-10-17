/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// get the current user
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// update current user
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// delete current user
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// update the role of the user
exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password)
    return next(
      new AppError(
        'this route is not to change password use /changePassword',
        403
      )
    );
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { role: req.body.role },
    {
      new: true,
      runValidators: true
    }
  );
  if (!user) return next(new AppError('There is no user with this Id.', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

//  get all users
exports.getAllUsers = factory.getAll(User);
// get only one user
exports.getUser = factory.getOne(User);
// delete the user
exports.deleteUser = factory.deleteOne(User);
// create user
exports.createUser = factory.createOne(User);

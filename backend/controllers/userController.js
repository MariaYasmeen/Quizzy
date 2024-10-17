import User from '../models/userModel.js';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';
import { getAll, getOne, deleteOne, createOne } from './handlerFactory.js';
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// get the current user
export function getMe(req, res, next) {
  req.params.id = req.user.id;
  next();
}

export const updateMe = catchAsync(async (req, res, next) => {
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

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
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

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
export const createUser = createOne(User);

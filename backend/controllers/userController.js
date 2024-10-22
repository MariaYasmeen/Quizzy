import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import User from '../models/userModel.js';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';
import { getAll, getOne, deleteOne, createOne } from './handlerFactory.js';
import multer from 'multer';
import sharp from 'sharp';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(
        path.resolve(__dirname, `../../frontend/public/users/${filename}`)
      ); // Use path.resolve for absolute path

    req.file.filename = filename;
    next();
  } catch (error) {
    console.error('Sharp processing error:', error);
    next(error);
  }
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
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
  const githubURL = '../../frontend/public/users/';
  if (req.body.password) {
    return next(
      new AppError(
        'this is not the route to change password! user updateMyPassword',
        404
      )
    );
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = `${githubURL}${req.file.filename}`;

  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
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
      runValidators: true,
    }
  );
  if (!user) return next(new AppError('There is no user with this Id.', 404));
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
export const createUser = createOne(User);

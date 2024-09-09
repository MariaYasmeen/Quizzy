/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Result = require('./../models/resultModel');

exports.createResult = catchAsync(async (req, res, next) => {
  req.body.student = req.user._id;
  if (!req.body.quiz) {
    req.body.quiz = req.params.quizId;
  }
  const result = await Result.create(req.body);
  if (!result)
    return next(new AppError('there is no result for this quiz', 404));
  res.status(200).json({
    status: 'success',
    data: {
      result
    }
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  const filter = {};
  filter.student = req.user._id;
  if (!filter.quiz) {
    filter.quiz = req.params.quizId;
  }
  const result = await Result.findOne(filter);
  if (!result)
    return next(new AppError('there is no result for this quiz', 404));
  res.status(200).json({
    status: 'success',
    result
  });
});

// exports.getAllResult = catchAsync(async (req, res, next) => {
//   req.body.student = '66ddb868e219d6e63c1db72e';
//   const result = await Result.findOne({
//     student: req.body.student
//   });
//   res.status(200).json({
//     status: 'success',
//     result
//   });
// });

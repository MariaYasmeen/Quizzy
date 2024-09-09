/* eslint-disable node/no-unsupported-features/es-syntax */
const Quiz = require('./../models/quizModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.handle = (req, res, next) => {
  res.status(200).json({
    message: 'quiz'
  });
};
exports.getAllQuiz = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find();
  res.status(200).json({
    status: 'success',
    result: quizzes.length,
    data: {
      quizzes
    }
  });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate('questions');
  if (!quiz) return next(new AppError('there is no quiz with this id '));
  res.status(200).json({
    status: 'success',
    data: {
      quiz
    }
  });
});
exports.createQuiz = catchAsync(async (req, res, next) => {
  if (!req.body.createdBy) {
    req.body.createdBy = req.user._id;
  }
  const quiz = await Quiz.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      quiz
    }
  });
});

exports.updateQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    questions,
    isPublic,
    startDate,
    endDate
  } = req.body;

  const quiz = await Quiz.findByIdAndUpdate(
    id,
    {
      title,
      description,
      questions,
      isPublic,
      startDate,
      endDate
    },
    {
      new: true,
      runValidators: true
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      quiz
    }
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const quiz = await Quiz.findByIdAndDelete(id);
  res.status(204).json({
    status: 'success',
    data: {
      quiz
    }
  });
});

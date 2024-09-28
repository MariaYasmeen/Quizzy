/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Question = require('./../models/questionModel');
const Quiz = require('./../models/quizModel');

// GET ALL QUESTIONS

exports.getAllQuestion = catchAsync(async (req, res, next) => {
  if (!req.body.quiz) {
    req.body.quiz = req.params.quizId;
  }
  const questions = await Question.find({ quiz: req.body.quiz });
  res.status(200).json({
    status: 'success',
    result: questions.length,
    data: {
      questions
    }
  });
});

// GET ONE QUESTION
exports.getQuestion = catchAsync(async (req, res, next) => {
  const { id, quizId } = req.params;
  if (!req.body.quiz) {
    req.body.quiz = quizId;
  }

  const question = await Question.findOne({ quiz: req.body.quiz, _id: id });
  if (!question)
    return next(new AppError('there is no question with this Id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      question
    }
  });
});

// CREATE QUESTION
exports.createQuestion = catchAsync(async (req, res, next) => {
  // Assign the quiz ID from params if not provided in the body
  if (!req.body.quiz) {
    req.body.quiz = req.params.quizId;
  }
  const question = await Question.create(req.body);
  const quiz = await Quiz.findByIdAndUpdate(
    req.body.quiz,
    { $push: { questions: question._id } },
    { new: true }
  );
  if (!quiz) {
    return next(new AppError('No quiz found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      question
    }
  });
});

// UPDATE QUESTION
exports.updateQuestion = catchAsync(async (req, res, next) => {
  const { id, quizId } = req.params;
  if (!req.body.quiz) {
    req.body.quiz = quizId;
  }

  const question = await Question.findOneAndUpdate(
    {
      quiz: req.body.quiz,
      _id: id
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!question)
    return next(new AppError('there is no question with this Id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      question
    }
  });
});

// DELETE QUESTION
exports.deleteQuestion = catchAsync(async (req, res, next) => {
  const { id, quizId } = req.params;
  if (!req.body.quiz) {
    req.body.quiz = quizId;
  }

  const question = await Question.findOneAndDelete({
    quiz: req.body.quiz,
    _id: id
  });
  if (!question)
    return next(new AppError('there is no question with this Id', 404));
  res.status(204).json({
    status: 'success',
    data: {
      question
    }
  });
});

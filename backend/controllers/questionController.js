/* eslint-disable node/no-unsupported-features/es-syntax */
import Question from '../models/questionModel.js';
import Quiz from '../models/quizModel.js';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';
export const getAllQuestion = catchAsync(async (req, res, next) => {
  if (!req.body.quiz) {
    req.body.quiz = req.params.quizId;
  }
  const questions = await Question.find({ quiz: req.body.quiz });
  res.status(200).json({
    status: 'success',
    result: questions.length,
    data: {
      questions,
    },
  });
});

export const getQuestion = catchAsync(async (req, res, next) => {
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
      question,
    },
  });
});

export const createQuestion = catchAsync(async (req, res, next) => {
  let quizId = req.body.quiz || req.params.quizId;
  if (!quizId) {
    return next(new AppError('Quiz ID is required', 400));
  }
  for (let index = 0; index < req.body.length; index++) {
    req.body[index].quiz = quizId;
  }
  const questions = await Question.insertMany(req.body);
  const quiz = await Quiz.findByIdAndUpdate(
    quizId,
    { $push: { questions: { $each: questions.map((q) => q._id) } } },
    { new: true }
  );
  if (!quiz) {
    return next(new AppError('No quiz found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      questions,
    },
  });
});

export const updateQuestion = catchAsync(async (req, res, next) => {
  const { id, quizId } = req.params;
  if (!req.body.quiz) {
    req.body.quiz = quizId;
  }

  const question = await Question.findOneAndUpdate(
    {
      quiz: req.body.quiz,
      _id: id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!question)
    return next(new AppError('there is no question with this Id', 404));
  res.status(200).json({
    status: 'success',
    data: {
      question,
    },
  });
});

export const deleteQuestion = catchAsync(async (req, res, next) => {
  const { id, quizId } = req.params;
  if (!req.body.quiz) {
    req.body.quiz = quizId;
  }

  const question = await Question.findOneAndDelete({
    quiz: req.body.quiz,
    _id: id,
  });
  if (!question)
    return next(new AppError('there is no question with this Id', 404));
  res.status(204).json({
    status: 'success',
    data: {
      question,
    },
  });
});

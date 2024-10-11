/* eslint-disable node/no-unsupported-features/es-syntax */
const Quiz = require('./../models/quizModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.publicQuizOnly = (req, res, next) => {
  req.query.isPublic = true;
  next();
};
exports.addCurrentUser = (req, res, next) => {
  req.body.createdBy = req.user._id;
  req.query.createdBy = req.user._id;
  next();
};
exports.getMyPrivateQuiz = (req, res, next) => {
  req.query.participants = req.user._id;
  req.query.isPublic = false;
  next();
};

exports.getAllQuiz = factory.getAll(Quiz);
exports.getQuiz = factory.getOne(Quiz, [
  { path: 'questions' },
  { path: 'createdBy' }
]);
exports.deleteQuiz = factory.deleteOne(Quiz);
exports.createQuiz = factory.createOne(Quiz);

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
  const quiz = await Quiz.findOneAndUpdate(
    { _id: id },
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
  if (!quiz) return next(new AppError('there is no quiz with this ID ', 404));
  res.status(200).json({
    status: 'success',
    data: {
      quiz
    }
  });
});
exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findOneAndDelete({
    _id: id
  });
  if (!quiz) return next(new AppError('there is no quiz with this ID ', 404));

  res.status(204).json({
    status: 'success'
  });
});
exports.deleteMyQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findOneAndDelete({
    _id: id,
    createdBy: req.user._id
  });
  if (!quiz) return next(new AppError('there is no quiz with this ID ', 404));

  res.status(204).json({
    status: 'success'
  });
});

/* eslint-disable node/no-unsupported-features/es-syntax */
import Quiz from './../models/quizModel.js';
import catchAsync from './../utils/catchAsync.js';
import AppError from './../utils/appError.js';
import { getAll, getOne, deleteOne, createOne } from './handlerFactory.js';

export function publicQuizOnly(req, res, next) {
  req.query.isPublic = true;
  next();
}
export function addCurrentUser(req, res, next) {
  req.body.createdBy = req.user._id;
  req.query.createdBy = req.user._id;
  if (!req.body.isPublic) {
    if (req.body.participants) {
      req.body.participants.push(req.user._id);
    } else {
      req.body.participants = [req.user._id];
    }
  }
  next();
}
export function getMyPrivateQuiz(req, res, next) {
  req.query.participants = req.user._id;
  req.query.isPublic = false;
  next();
}

export const getAllQuiz = getAll(Quiz);
export const getQuiz = getOne(Quiz, [
  { path: 'questions' },
  { path: 'createdBy' },
]);
export const deleteQuiz = deleteOne(Quiz);
export const createQuiz = createOne(Quiz);

export const updateQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, questions, isPublic, startDate, endDate } =
    req.body;
  const quiz = await Quiz.findOneAndUpdate(
    { _id: id },
    {
      title,
      description,
      questions,
      isPublic,
      startDate,
      endDate,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!quiz) return next(new AppError('there is no quiz with this ID ', 404));
  res.status(200).json({
    status: 'success',
    data: {
      quiz,
    },
  });
});
// export const deleteQuiz = catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const quiz = await Quiz.findOneAndDelete({
//     _id: id,
//   });
//   if (!quiz) return next(new AppError('there is no quiz with this ID ', 404));

//   res.status(204).json({
//     status: 'success',
//   });
// });
export const deleteMyQuiz = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findOneAndDelete({
    _id: id,
    createdBy: req.user._id,
  });
  if (!quiz) return next(new AppError('there is no quiz with this ID ', 404));

  res.status(204).json({
    status: 'success',
  });
});

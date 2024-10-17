/* eslint-disable node/no-unsupported-features/es-syntax */
import QuestionAnswer from '../models/questionAnswerModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { getAll, getOne } from './handlerFactory.js';
export const getAllQuestionAnswer = getAll(QuestionAnswer);

export const getQuestionAnswer = getOne(QuestionAnswer, [
  { path: 'askedBy', select: 'name' },
  {
    path: 'answers.answeredBy',
    model: 'User',
    select: 'name',
  },
]);
// catchAsync(async (req, res, next) => {
//   const { id } = req.params;
//   const questionAnswer = await QuestionAnswer.findById(id)
//     .populate({ path: 'askedBy', select: 'name' })
//     .populate({
//       path: 'answers.answeredBy',
//       model: 'User',
//       select: 'name',
//     });
//   if (!questionAnswer) {
//     return next(new AppError('No question found with that ID', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     questionAnswer,
//   });
// });

export const createQuestionAnswer = catchAsync(async (req, res, next) => {
  req.body.askedBy = req.user._id;
  const questionAnswer = await QuestionAnswer.create(req.body);
  res.status(201).json({
    status: 'success',
    questionAnswer,
  });
});

export const addAnswer = catchAsync(async (req, res, next) => {
  const { questionId } = req.params;
  const { answerText } = req.body;
  const answeredBy = req.user._id;

  const updatedQuestion = await QuestionAnswer.findByIdAndUpdate(
    questionId,
    {
      $push: {
        answers: {
          answerText: answerText,
          answeredBy: answeredBy,
          votes: 0,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );

  if (!updatedQuestion) {
    return next(new AppError('Question not found.', 404));
  }

  res.status(201).json({
    message: 'success',
    updatedQuestion,
  });
});

export const addVoteForQuestion = catchAsync(async (req, res, next) => {
  const { questionId } = req.params;
  const userId = req.user._id;

  const question = await QuestionAnswer.findById(questionId);
  if (question.votedBy.includes(userId)) {
    return next(new AppError('You have already voted.', 400));
  }

  question.votes += 1;
  question.votedBy.push(userId);
  await question.save();

  res
    .status(200)
    .json({ message: 'Vote added successfully.', votes: question.votes });
});

export const addVoteForAnswer = catchAsync(async (req, res, next) => {
  const { questionId, answerId } = req.params;
  const userId = req.user._id;
  const question = await QuestionAnswer.findById(questionId);
  const answer = question.answers.id(answerId);
  if (answer?.votedBy?.includes(userId)) {
    return next(new AppError('You have already voted for this answer.', 400));
  }
  answer.votes += 1;
  answer.votedBy.push(userId);

  await question.save();
  res
    .status(200)
    .json({ message: 'Vote added successfully.', votes: answer.votes });
});

export const tenFrequentlyAskedQuestions = catchAsync(
  async (req, res, next) => {
    console.log('works');
    req.query.limit = '10';
    req.query.sort = '-votes';
    req.query.fields = 'votes';
    next();
  }
);

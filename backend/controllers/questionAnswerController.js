/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const QuestionAnswer = require('./../models/questionAnswerModel');

exports.handle = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'message'
  });
});

exports.getAllQuestionAnswer = catchAsync(async (req, res, next) => {
  const questionAnswers = await QuestionAnswer.find();
  res.status(200).json({
    status: 'success',
    questionAnswers
  });
});
exports.getQuestionAnswer = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const questionAnswer = await QuestionAnswer.findById(id);
  res.status(200).json({
    status: 'success',
    questionAnswer
  });
});

exports.createQuestionAnswer = catchAsync(async (req, res, next) => {
  req.body.askedBy = '66ddb868e219d6e63c1db72e';
  const questionAnswer = await QuestionAnswer.create(req.body);
  res.status(201).json({
    status: 'success',
    questionAnswer
  });
});

exports.addAnswer = catchAsync(async (req, res, next) => {
  const questionId = req.params.id;
  const { answerText, answeredBy } = req.body;

  const updatedQuestion = await QuestionAnswer.findByIdAndUpdate(
    questionId,
    {
      $push: {
        answers: {
          answerText: answerText,
          answeredBy: answeredBy,
          votes: 0,
          createdAt: new Date()
        }
      }
    },
    { new: true }
  );

  if (!updatedQuestion) {
    return next(new AppError('Question not found.', 404));
  }

  res.status(201).json({
    message: 'success',
    updatedQuestion
  });
});

exports.addVoteForQuestion = catchAsync(async (req, res, next) => {
  const questionId = req.params.id;
  const userId = '66ddb868e219d6e63c1db72e';

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

exports.addVoteForAnswer = catchAsync(async (req, res, next) => {
  const { questionId, answerId } = req.params;
  const userId = '66ddb868e219d6e63c1db72e';

  const question = await QuestionAnswer.findById(questionId);
  const answer = question.answers.id(answerId);

  if (answer.votedBy.includes(userId)) {
    return next(new AppError('You have already voted for this answer.', 400));
  }
  answer.votes += 1;
  answer.votedBy.push(userId);

  await question.save();
  res
    .status(200)
    .json({ message: 'Vote added successfully.', votes: answer.votes });
});

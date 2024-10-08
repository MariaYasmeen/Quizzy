/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const QuestionAnswer = require('./../models/questionAnswerModel');

exports.getAllQuestionAnswer = catchAsync(async (req, res, next) => {
  const questionAnswers = await QuestionAnswer.find();
  res.status(200).json({
    status: 'success',
    questionAnswers
  });
});
exports.getQuestionAnswer = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const questionAnswer = await QuestionAnswer.findById(id)
    .populate({ path: 'askedBy', select: 'name' })
    .populate({
      path: 'answers.answeredBy',
      model: 'User',
      select: 'name'
    });
  if (!questionAnswer) {
    return next(new AppError('No question found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    questionAnswer
  });
});

exports.createQuestionAnswer = catchAsync(async (req, res, next) => {
  req.body.askedBy = req.user._id;
  const questionAnswer = await QuestionAnswer.create(req.body);
  res.status(201).json({
    status: 'success',
    questionAnswer
  });
});

exports.addAnswer = catchAsync(async (req, res, next) => {
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

exports.addVoteForAnswer = catchAsync(async (req, res, next) => {
  const { questionId, answerId } = req.params;
  const userId = req.user._id;

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

exports.tenFrequentlyAskedQuestions = catchAsync(async (req, res, next) => {
  const tenFAQ = await QuestionAnswer.aggregate([
    {
      $match: { isResolved: { $ne: false } }
    },
    {
      $sort: { votes: 1 }
    }
  ]);

  res.status(200).json({
    status: 'faq',
    data: {
      tenFAQ
    }
  });
});

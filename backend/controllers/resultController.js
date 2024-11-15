import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import Result from './../models/resultModel.js';
import Question from './../models/questionModel.js';

async function processAnswers(answers) {
  const processedAnswers = [];
  for (const answer of answers) {
    const question = await Question.findById(answer.question).exec();
    if (question) {
      const correctOption = question.options.find((option) => option.isCorrect);
      const isCorrect =
        correctOption && answer.selectedOption === correctOption.text;

      processedAnswers.push({
        question: answer.question,
        selectedOption: answer.selectedOption,
        isCorrect: isCorrect,
      });
    } else {
      processedAnswers.push({
        question: answer.question,
        selectedOption: answer.selectedOption,
        isCorrect: false,
      });
    }
  }
  return processedAnswers;
}

async function calculateScore(answers) {
  return answers.reduce(
    (total, answer) => total + (answer.isCorrect ? 1 : 0),
    0
  );
}
export const createResult = catchAsync(async (req, res, next) => {
  req.body.student = req.user._id;
  if (!req.body.quiz) {
    req.body.quiz = req.params.quizId;
  }
  const processedAnswers = await processAnswers(req.body.answers);
  const score = await calculateScore(processedAnswers);
  const result = await Result.create({
    quiz: req.body.quiz,
    student: req.body.student,
    answers: processedAnswers,
    score: score,
  });
  if (!result) {
    return next(new AppError('There is no result for this quiz', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});

export const updateResult = catchAsync(async (req, res, next) => {
  const resultId = req.params.id;
  const result = await Result.findById(resultId).exec();
  if (!result) {
    return next(new AppError('Result not found', 404));
  }
  const processedAnswers = await processAnswers(req.body.answers);
  const score = await calculateScore(processedAnswers);
  result.answers = processedAnswers;
  result.score = score;
  await result.save();
  res.status(200).json({
    status: 'success',
    data: {
      result,
    },
  });
});
export const getResult = catchAsync(async (req, res, next) => {
  const filter = {};
  filter.student = req.user._id;
  if (!filter.quiz) {
    filter.quiz = req.params.quizId;
  }
  const result = await Result.findOne(filter)
    .populate({
      path: 'quiz',
      select: 'title',
    })
    .populate({ path: 'student', select: 'name' });
  if (!result)
    return next(new AppError('there is no result for this quiz', 404));
  res.status(200).json({
    status: 'success',
    result,
  });
});

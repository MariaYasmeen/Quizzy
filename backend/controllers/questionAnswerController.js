/* eslint-disable node/no-unsupported-features/es-syntax */
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import QuestionAnswer from '../models/questionAnswerModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { getAll, getOne } from './handlerFactory.js';
// new
import multer from 'multer';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const multerStorage = multer.memoryStorage();

// Filter to allow only image uploads
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload images only', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array('questionDocument', 10);

export const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_UNEXPECTED_FILE')
        return next(new AppError('Upload only image files', 403));
    } else if (err) {
      return next(new AppError('Error occurred while uploading images', 500));
    }
    next();
  });
};

export const resizeImage = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.questionDocument = []; // Ensure it's initialized as an array
  await Promise.all(
    req.files.map(async (file, index) => {
      const newFileName = `Q&A-${index}-${
        req.user._id
      }-${Date.now()}-${req.body.questionText.slice(0, 10)}.jpeg`;
      await sharp(file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(
          path.resolve(__dirname, `../../frontend/public/Q&A/${newFileName}`)
        );
      req.body.questionDocument.push(newFileName); // Corrected this line
    })
  );
  next();
});

// old
export const getAllQuestionAnswer = getAll(QuestionAnswer);

export const getQuestionAnswer = getOne(QuestionAnswer, [
  { path: 'askedBy', select: 'name' },
  {
    path: 'answers.answeredBy',
    model: 'User',
    select: 'name',
  },
]);

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

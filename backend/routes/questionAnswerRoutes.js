import { Router } from 'express';
import {
  tenFrequentlyAskedQuestions,
  getAllQuestionAnswer,
  getQuestionAnswer,
  createQuestionAnswer,
  addVoteForQuestion,
  addAnswer,
  addVoteForAnswer,
  uploadImages,
  resizeImage,
} from './../controllers/questionAnswerController.js';
import { protect } from './../controllers/authController.js';

const router = Router();
// get ten frequently asked questions
router.get('/ten-faq', tenFrequentlyAskedQuestions, getAllQuestionAnswer);

router.get('/', getAllQuestionAnswer);
router.get('/:id', getQuestionAnswer);
router.use(protect);
router.post('/', uploadImages, resizeImage, createQuestionAnswer);
// POST /api/v1/qna/:id/vote

router.route('/:questionId/vote').post(addVoteForQuestion);
// /api/v1/qna/:id/answers/:answerId/vote
router.route('/:questionId/answer').post(addAnswer);
router.route('/:questionId/answer/:answerId/vote').post(addVoteForAnswer);

export default router;

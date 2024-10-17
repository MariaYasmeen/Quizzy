// POST /api/v1/quizzes/:quizId/questions: Add a question to a quiz.
// GET /api/v1/quizzes/:quizId/questions: Retrieve questions for a specific quiz.

import { Router } from 'express';
import {
  getAllQuestion,
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from './../controllers/questionController.js';
import { protect, restrictTo } from './../controllers/authController.js';

const router = Router({ mergeParams: true });
router.use(protect);
router.route('/').get(getAllQuestion).post(createQuestion);

router
  .route('/:id')
  .get(getQuestion)
  .patch(restrictTo('premium-user', 'admin'), updateQuestion)
  .delete(restrictTo('premium-user', 'admin'), deleteQuestion);
export default router;

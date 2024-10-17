// POST /api/v1/quizzes: Create a new quiz.
// GET /api/v1/quizzes: Retrieve all quizzes.
// GET /api/v1/quizzes/:id: Get details of a specific quiz.
// PUT /api/v1/quizzes/:id: Update a quiz.
// DELETE /api/v1/quizzes/:id: Delete a quiz.

import { Router } from 'express';
import questionRouter from './questionRoutes.js';
import resultRouter from './resultRoutes.js';
import {
  publicQuizOnly,
  getAllQuiz,
  addCurrentUser,
  createQuiz,
  getMyPrivateQuiz,
  getQuiz,
  updateQuiz,
  deleteMyQuiz,
  deleteQuiz,
} from './../controllers/quizController.js';
import { protect, restrictTo } from './../controllers/authController.js';

const router = Router();

// for authorized users
router.use(protect);

router.route('/').get(publicQuizOnly, getAllQuiz).post(
  restrictTo('premium-user', 'admin'), // creating quiz is for only teacher and admin
  addCurrentUser,
  createQuiz
);
router.route('/privateQuiz').get(getMyPrivateQuiz, getAllQuiz);
router.route('/allAvailableQuiz').get(restrictTo('admin'), getAllQuiz);

// for teachers (owner of the quiz)
router.get('/myQuiz', addCurrentUser, getAllQuiz);
// for admins

router.get('/:id', publicQuizOnly, getQuiz);
router.route('/privateQuiz/:id').get(getMyPrivateQuiz, getQuiz);
router
  .route('/myQuiz/:id')
  .get(addCurrentUser, getQuiz)
  .patch(updateQuiz)
  .delete(deleteMyQuiz);

router
  .route('/allAvailableQuiz/:id')
  .get(restrictTo('admin'), getQuiz)
  .delete(restrictTo('admin'), deleteQuiz);

// later
router.use('/:quizId/questions', questionRouter);
router.use('/:quizId/take', resultRouter);
router.use('/:quizId/results', resultRouter);

export default router;

// POST /api/v1/quizzes/:quizId/take: Submit answers for a quiz.

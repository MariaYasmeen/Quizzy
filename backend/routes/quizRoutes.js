// POST /api/v1/quizzes: Create a new quiz.
// GET /api/v1/quizzes: Retrieve all quizzes.
// GET /api/v1/quizzes/:id: Get details of a specific quiz.
// PUT /api/v1/quizzes/:id: Update a quiz.
// DELETE /api/v1/quizzes/:id: Delete a quiz.

const express = require('express');
const questionRouter = require('./questionRoutes');
const resultRouter = require('./resultRoutes');
const quizController = require('./../controllers/quizController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router
  .route('/')
  .get(quizController.getAllQuiz)
  .post(quizController.createQuiz);
router
  .route('/:id')
  .get(quizController.getQuiz)
  .patch(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

router.use('/:quizId/questions', questionRouter);

router.use('/:quizId/take', resultRouter);
router.use('/:quizId/results', resultRouter);

module.exports = router;

// POST /api/v1/quizzes/:quizId/take: Submit answers for a quiz.

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

// for authorized users
router.use(authController.protect);

router
  .route('/')
  .get(quizController.publicQuizOnly, quizController.getAllQuiz)
  .post(
    authController.restrictTo('premium-user', 'admin'), // creating quiz is for only teacher and admin
    quizController.addCurrentUser,
    quizController.createQuiz
  );
router
  .route('/privateQuiz')
  .get(quizController.getMyPrivateQuiz, quizController.getAllQuiz);
router
  .route('/allAvailableQuiz')
  .get(authController.restrictTo('admin'), quizController.getAllQuiz);

// for teachers (owner of the quiz)
router.get('/myQuiz', quizController.addCurrentUser, quizController.getAllQuiz);
// for admins

router.get('/:id', quizController.publicQuizOnly, quizController.getQuiz);
router
  .route('/privateQuiz/:id')
  .get(quizController.getMyPrivateQuiz, quizController.getQuiz);
router
  .route('/myQuiz/:id')
  .get(quizController.addCurrentUser, quizController.getQuiz)
  .patch(quizController.updateQuiz)
  .delete(quizController.deleteMyQuiz);

router
  .route('/allAvailableQuiz/:id')
  .get(authController.restrictTo('admin'), quizController.getQuiz)
  .delete(authController.restrictTo('admin'), quizController.deleteQuiz);

// later
router.use('/:quizId/questions', questionRouter);
router.use('/:quizId/take', resultRouter);
router.use('/:quizId/results', resultRouter);

module.exports = router;

// POST /api/v1/quizzes/:quizId/take: Submit answers for a quiz.

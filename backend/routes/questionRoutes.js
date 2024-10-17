// POST /api/v1/quizzes/:quizId/questions: Add a question to a quiz.
// GET /api/v1/quizzes/:quizId/questions: Retrieve questions for a specific quiz.

const express = require('express');
const questionController = require('./../controllers/questionController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router
  .route('/')
  .get(questionController.getAllQuestion)
  .post(questionController.createQuestion);

router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(
    authController.restrictTo('premium-user', 'admin'),
    questionController.updateQuestion
  )
  .delete(
    authController.restrictTo('premium-user', 'admin'),
    questionController.deleteQuestion
  );
module.exports = router;

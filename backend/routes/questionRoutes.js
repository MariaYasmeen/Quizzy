// POST /api/v1/quizzes/:quizId/questions: Add a question to a quiz.
// GET /api/v1/quizzes/:quizId/questions: Retrieve questions for a specific quiz.

const express = require('express');
const questionController = require('./../controllers/questionController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(questionController.getAllQuestion)
  .post(questionController.createQuestion);
router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);
module.exports = router;

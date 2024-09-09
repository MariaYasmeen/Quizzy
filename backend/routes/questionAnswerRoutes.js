// POST /api/v1/qna: Ask a new question (signed-in users only).
// GET /api/v1/qna: Retrieve all questions.
// GET /api/v1/qna/:id: Get details of a specific question, including answers.
// POST /api/v1/qna/:id/answer: Answer a specific question.

const express = require('express');
const questionAnswerController = require('../controllers/questionAnswerController');

const router = express.Router();

router
  .route('/')
  .get(questionAnswerController.getAllQuestionAnswer)
  .post(questionAnswerController.createQuestionAnswer);

router.route('/:id').get(questionAnswerController.getQuestionAnswer);
// POST /api/v1/qna/:id/vote
router.route('/:id/vote').post(questionAnswerController.addVoteForQuestion);

// /api/v1/qna/:id/answers/:answerId/vote
router
  .route('/:questionId/answer/:answerId/vote')
  .post(questionAnswerController.addVoteForAnswer);

module.exports = router;

const express = require('express');
const questionAnswerController = require('./../controllers/questionAnswerController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/ten-faq', questionAnswerController.tenFrequentlyAskedQuestions);

router.route('/').get(questionAnswerController.getAllQuestionAnswer);
router.route('/:id').get(questionAnswerController.getQuestionAnswer);
router.use(authController.protect);
router.route('/').post(questionAnswerController.createQuestionAnswer);
// POST /api/v1/qna/:id/vote

router
  .route('/:questionId/vote')
  .post(questionAnswerController.addVoteForQuestion);
// /api/v1/qna/:id/answers/:answerId/vote
router.route('/:questionId/answer').post(questionAnswerController.addAnswer);
router
  .route('/:questionId/answer/:answerId/vote')
  .post(questionAnswerController.addVoteForAnswer);

module.exports = router;

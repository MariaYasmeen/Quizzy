// POST /api/v1/quizzes/:quizId/take: Submit answers for a quiz.
// GET /api/v1/users/:userId/results: Retrieve all results for a specific user.

const express = require('express');
const resultController = require('./../controllers/resultController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);

router
  .route('/')
  .get(resultController.getResult)
  .post(resultController.createResult);

router.patch('/:id', resultController.updateResult);
module.exports = router;

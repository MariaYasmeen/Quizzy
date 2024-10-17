// POST /api/v1/quizzes/:quizId/take: Submit answers for a quiz.
// GET /api/v1/users/:userId/results: Retrieve all results for a specific user.

import { Router } from 'express';
import {
  getResult,
  createResult,
  updateResult,
} from './../controllers/resultController.js';
import { protect } from './../controllers/authController.js';

const router = Router({ mergeParams: true });
router.use(protect);

router.route('/').get(getResult).post(createResult);

router.patch('/:id', updateResult);
export default router;

const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.route('/forgetPassword').patch();
router.route('/resetPassword').patch();

router.use(authController.protect);

router.route('/me').get(userController.getMe);
router.route('/updateMe').patch(userController.updateMe);
router.route('/deleteMe').delete(userController.deleteMe);

router
  .route('/')
  .get(authController.getAllUsers)
  .post(authController.createUser);
router
  .route('/:id')
  .delete(authController.deleteUser)
  .patch(authController.updateUser)
  .get(authController.getUser);

module.exports = router;

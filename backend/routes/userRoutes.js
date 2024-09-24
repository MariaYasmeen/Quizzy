const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

// for all users
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgetPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

// only for authenticated users
router.use(authController.protect);

// - for current user
router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe); // this only mage the current user isActive to false
router.patch('/updatePassword', authController.updatePassword);

// for admin only
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .delete(userController.deleteUser)
  .patch(userController.updateUser)
  .get(userController.getUser);

module.exports = router;

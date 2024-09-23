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
router.route('/me').get(userController.getMe);
router.route('/updateMe').patch(userController.updateMe);
router.route('/deleteMe').delete(userController.deleteMe); // this only mage the current user isActive to false

// // for admin only
// router
//   .route('/')
//   .get(authController.getAllUsers)
//   .post(authController.createUser);
// router
//   .route('/:id')
//   .delete(authController.deleteUser)
//   .patch(authController.updateUser)
//   .get(authController.getUser);

module.exports = router;

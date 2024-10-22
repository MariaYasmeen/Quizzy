import { Router } from 'express';
import {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
  uploadUserPhoto,
  resizeUserPhoto,
} from './../controllers/userController.js';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} from './../controllers/authController.js';

const router = Router();

// for all users
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgetPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

// only for authenticated users
router.use(protect);

// - for current user
router.get('/me', getMe);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe); // this only mage the current user isActive to false
router.patch('/updatePassword', updatePassword);

// for admin only
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').delete(deleteUser).patch(updateUser).get(getUser);

export default router;

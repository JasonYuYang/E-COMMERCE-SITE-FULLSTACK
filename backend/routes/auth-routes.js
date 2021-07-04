const express = require('express');

const authController = require('../controllers/auth-controller');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

router.post('/signup', authController.userSignUp);
router.post('/login', authController.userLogin);
router.get('/logout', authController.userLogout);

router.post('/password/forgot', authController.forgotPassword);
router.put('/password/reset/:token', authController.resetPassword);

router.get('/me', checkAuth.isAuthenticatedUser, authController.getUserProfile);
router.put(
  '/me/update',
  checkAuth.isAuthenticatedUser,
  authController.updateUserProfile
);
router.put(
  '/password/update',
  checkAuth.isAuthenticatedUser,
  authController.updatePassword
);

router.get(
  '/admin/users',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  authController.getAllUsersByAdmin
);
router.get(
  '/admin/user/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  authController.getUserDetailsByAdmin
);
router.put(
  '/admin/user/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  authController.updateUserByAdmin
);
router.delete(
  '/admin/user/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  authController.deleteUserByAdmin
);

module.exports = router;

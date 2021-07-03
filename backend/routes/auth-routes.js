const express = require('express');

const authController = require('../controllers/auth-controller');
const router = express.Router();

router.post('/signup', authController.userSignUp);
router.post('/login', authController.userLogin);
router.get('/logout', authController.userLogout);

module.exports = router;

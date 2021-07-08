const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const paymentController = require('../controllers/payment-controller');

router.post(
  '/payment/process',
  checkAuth.isAuthenticatedUser,
  paymentController.processPayment
);
router.get(
  '/stripeapi',
  checkAuth.isAuthenticatedUser,
  paymentController.sendStripApi
);

module.exports = router;

const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const orderController = require('../controllers/order-controller');

router.post(
  '/order/new',
  checkAuth.isAuthenticatedUser,
  orderController.newOrder
);
router.get(
  '/order/:id',
  checkAuth.isAuthenticatedUser,
  orderController.getSingleOrder
);

module.exports = router;

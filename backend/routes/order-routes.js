const express = require('express');

const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const orderController = require('../controllers/order-controller');

router.post('/order/new', checkAuth.isAuthenticatedUser, orderController.newOrder);
router.get('/order/:id', checkAuth.isAuthenticatedUser, orderController.getSingleOrder);
router.get('/orders/me', checkAuth.isAuthenticatedUser, orderController.myOrders);

//ADMIN

router.get(
  '/admin/orders',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  orderController.allOrders
);
router.put(
  '/admin/order/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  orderController.updateOrder
);
router.delete(
  '/admin/order/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  orderController.deleteOrder
);
module.exports = router;

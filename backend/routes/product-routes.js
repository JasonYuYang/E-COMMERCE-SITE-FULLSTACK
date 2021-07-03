const express = require('express');

const productController = require('../controllers/product-controller');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);

router.post(
  '/admin/product/new',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  productController.newProduct
);
router.put(
  '/admin/product/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  productController.updateProduct
);
router.delete(
  '/admin/product/:id',
  checkAuth.isAuthenticatedUser,
  checkAuth.authorizeRoles('admin'),
  productController.deleteProduct
);

module.exports = router;

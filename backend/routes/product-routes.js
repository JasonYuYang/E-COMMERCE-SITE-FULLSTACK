const express = require('express');

const productController = require('../controllers/product-controller');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);

router.use(checkAuth.isAuthenticatedUser);

router.post(
  '/admin/product/new',
  checkAuth.authorizeRoles,
  productController.newProduct
);
router.put(
  '/admin/product/:id',
  checkAuth.authorizeRoles,
  productController.updateProduct
);
router.delete(
  '/admin/product/:id',
  checkAuth.authorizeRoles,
  productController.deleteProduct
);

module.exports = router;

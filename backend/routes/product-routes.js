const express = require('express');

const productController = require('../controllers/product-controller');
const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProductById);

router.post('/admin/product/new', productController.newProduct);
router.put('/admin/product/:id', productController.updateProduct);
router.delete('/admin/product/:id', productController.deleteProduct);

module.exports = router;

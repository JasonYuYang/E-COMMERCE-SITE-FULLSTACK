const Product = require('../models/product');

const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products: products.map((product) => {
      return product.toObject({ getters: true });
    }),
    message: 'Success get all products in the database',
  });
};

// Get single product details   =>   /api/v1/product/:id
const getProductById = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({
      message: 'Product not found.',
    });
  }

  res.status(200).json({
    success: true,
    product: product.toObject({ getters: true }),
  });
};

// Create new product   =>   /api/v1/admin/product/new
const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product: product.toObject({ getters: true }),
  });
};

// Update Product   =>   /api/v1/admin/product/:id
const updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!product) {
    res.status(404).json({
      message: 'Product not found.',
    });
  }

  res.status(200).json({
    success: true,
    product: product,
  });
};

// Delete Product   =>   /api/v1/admin/product/:id
const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  await product.remove();
  if (!product) {
    res.status(404).json({
      message: 'Product not found.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product is delete',
  });
};

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.newProduct = newProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

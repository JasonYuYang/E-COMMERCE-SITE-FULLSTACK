const Product = require('../models/product');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Get all products   =>   /api/v1/products?keyword=apple
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  let products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    products: products.map((product) => {
      return product.toObject({ getters: true });
    }),
    message: 'Success get all products in the database',
  });
});

// Get single product details   =>   /api/v1/product/:id
const getProductById = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product: product.toObject({ getters: true }),
  });
});

// Create new product   =>   /api/v1/admin/product/new
const newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product: product.toObject({ getters: true }),
  });
});

// Update Product   =>   /api/v1/admin/product/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product: product,
  });
});

// Delete Product   =>   /api/v1/admin/product/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  await product.remove();

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product is delete',
  });
});

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.newProduct = newProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

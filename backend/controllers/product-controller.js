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
  req.body.user = req.user.id;

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

// Create new review   =>   /api/v1/review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Product Reviews   =>   /api/v1/reviews
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Product Review   =>   /api/v1/reviews
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.newProduct = newProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.createProductReview = createProductReview;
exports.getProductReviews = getProductReviews;
exports.deleteReview = deleteReview;

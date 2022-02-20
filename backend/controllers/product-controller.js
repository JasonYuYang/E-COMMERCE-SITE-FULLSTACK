const cloudinary = require('cloudinary');
const Product = require('../models/product');
const APIFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Get all products   =>   /api/v1/products?keyword=apple
const getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = req.query.category ? 6 : req.query.keyword ? 6 : 3;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().sort();

  let products = await apiFeatures.query;
  const filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    filteredProductsCount,
    resPerPage,
    products: products.map((product) => product.toObject({ getters: true })),
    message: 'Success get all products in the database',
  });
});

// Get all products (Admin)  =>   /api/v1/admin/products
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products: products.map((product) => product.toObject({ getters: true })),
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
  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    [images] = req.body;
  }

  const imagesLinks = [];

  if (!imagesLinks) {
    return next(new ErrorHandler('Please Add Product Images', 404));
  }

  await Promise.all(
    images.map(async (image) => {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'products',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    })
  );

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Update Product   =>   /api/v1/admin/product/:id
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  let product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  let images = [];
  if (typeof req.body.images === 'string') {
    images.push(req.body.images);
  } else {
    [images] = req.body;
  }

  if (Array.isArray(images) && images.length) {
    const imagesLinks = [];
    //  Deleting images associated with the product
    await Promise.all(
      product.images.map(async (image) => {
        await cloudinary.v2.uploader.destroy(image.public_id);
      })
    );

    await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: 'products',
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      })
    );
    console.log(imagesLinks.length);
    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product: product,
  });
});

// Delete Product   =>   /api/v1/admin/product/:id
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  // Deleting images associated with the product
  await Promise.all(
    product.images.map(async (image) => {
      await cloudinary.v2.uploader.destroy(image.public_id);
    })
  );

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

  const isReviewed = product.reviews.find((r) => r.user.toString() === req.user.id.toString());

  if (isReviewed) {
    product.reviews.forEach((productReview) => {
      if (productReview.user.toString() === req.user.id.toString()) {
        productReview.comment = comment;
        productReview.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

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

  const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;

  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

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
exports.getAdminProducts = getAdminProducts;
exports.newProduct = newProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.createProductReview = createProductReview;
exports.getProductReviews = getProductReviews;
exports.deleteReview = deleteReview;

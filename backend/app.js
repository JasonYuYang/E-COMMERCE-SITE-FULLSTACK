const express = require('express');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const errorMiddleware = require('./middleware/error');
const productRoutes = require('../backend/routes/product-routes');
const authRoutes = require('../backend/routes/auth-routes');
const orderRoutes = require('../backend/routes/order-routes');
const paymentRoutes = require('../backend/routes/payment-routes');

const app = express();

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' });

//Set security HTTP header
app.use(helmet({ contentSecurityPolicy: false }));

//Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP,please try again in an hour',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.enable('trust proxy');

app.use('/api/v1', authRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

const express = require('express');
const path = require('path');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const compression = require('compression');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const errorMiddleware = require('./middleware/error');
const productRoutes = require('./routes/product-routes');
const authRoutes = require('./routes/auth-routes');
const orderRoutes = require('./routes/order-routes');
const paymentRoutes = require('./routes/payment-routes');

const app = express();
app.enable('trust proxy');
// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') dotenv.config({ path: 'backend/config/config.env' });

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

app.use('/api/v1', authRoutes);
app.use('/api/v1', paymentRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

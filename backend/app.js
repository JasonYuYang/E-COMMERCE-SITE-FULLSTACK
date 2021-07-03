const express = require('express');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middleware/error');
const productRoutes = require('../backend/routes/product-routes');
const authRoutes = require('../backend/routes/auth-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', authRoutes);
app.use('/api/v1', productRoutes);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;

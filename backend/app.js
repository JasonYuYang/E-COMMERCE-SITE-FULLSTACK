const express = require('express');

const productRoutes = require('../backend/routes/product-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', productRoutes);

module.exports = app;

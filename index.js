const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require("./config/db")
const userRoutes = require('./routes/user.routes.js');
const productRoutes = require('./routes/product.routes.js')

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

console.log(`Environment: ${process.env.NODE_ENV}`);

app.get('/', (req, res) => {
    res.send('E-Commerce Backend is Running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

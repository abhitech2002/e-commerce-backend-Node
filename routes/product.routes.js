const express = require('express');
const router = express.Router();
const { addProduct, getAllProducts, getProductById } = require('../controllers/product.controller.js');
const { protect, adminOnly } = require('../middlewares/auth.middleware.js');

router.post('/add-product', protect, adminOnly, addProduct);

router.get('/get-all-products', getAllProducts);

router.get('/get-product/:id', getProductById);

module.exports = router;
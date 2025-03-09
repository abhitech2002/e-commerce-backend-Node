const express = require('express');
const router = express.Router();
const { addProduct } = require('../controllers/product.controller.js');
const { protect, adminOnly } = require('../middlewares/auth.middleware.js');

router.post('/add-product', protect, adminOnly, addProduct);

module.exports = router;
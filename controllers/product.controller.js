const Product = require('../models/Product.models.js');
const asyncHandler = require('express-async-handler');

const addProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    if(!name || !description || !price || !category || !stock || !images) {
        res.status(400).json({ success: false, message: "Please fill all the fields" });
        return;
    }

    const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock,
        images
    });

    const result = await newProduct.save();
    
    res.status(201).json({ success: true, message: "New Product Added Successfully" , data: result });
});

module.exports = { addProduct };
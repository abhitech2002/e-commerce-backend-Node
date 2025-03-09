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

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json({ success: true, message: "Fetched all product successfully", data: products });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.status(200).json({ success: true, message: "Fetched product successfully", data: product });
    } else {
        res.status(404).json({ success: false, message: "Product not found" });
    }
})

module.exports = { addProduct, getAllProducts, getProductById};
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

console.log(`Environment: ${process.env.NODE_ENV}`);

app.get('/', (req, res) => {
    res.send('E-Commerce Backend is Running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

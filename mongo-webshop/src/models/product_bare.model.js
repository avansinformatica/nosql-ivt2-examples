const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// we use the review schema in the product schema
const ReviewSchema = require('./review.schema');

// define the product schema
const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    reviews: [ReviewSchema],
});

// create the product model
Product = mongoose.model('product', ProductSchema);

// export the product model
module.exports = Product;
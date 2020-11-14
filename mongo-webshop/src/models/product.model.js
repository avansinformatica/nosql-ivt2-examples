const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getModel = require('./model_cache')

// we use the review schema in the product schema
const ReviewSchema = require('./review.schema');

// define the product schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A product needs a name.']
    },
    description: String,
    price: {
        type: Number,
        required: [true, 'A product needs a price.'],
        validate: {
            validator: (price) => price > 0,
            message: 'A price needs to be positive.'
        }
    },
    reviews: {
        type: [ReviewSchema],
        default: []
    }
});

// the rating of the product is a virtual type
// note: use an anonymous function and not a lambda here!
// otherwise 'this' does not refer to the correct object
ProductSchema.virtual('rating').get(function () {
    // if there are no reviews we give back a message
    if(this.reviews.length === 0) {
        return "no rating"
    } else {
        // computes the average rating
        let sum = 0
        for(let review of this.reviews) {
            sum += review.rating
        }
        return sum / this.reviews.length
    }
})

// create the product model
// Product = mongoose.model('Product', ProductSchema);

// export the product model
module.exports = getModel('Product', ProductSchema)
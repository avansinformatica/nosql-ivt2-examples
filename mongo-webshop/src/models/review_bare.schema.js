const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define a schema for reviews
const ReviewSchema = new Schema({
    text: String,
    rating: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

// export the review schema
module.exports = ReviewSchema;
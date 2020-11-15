const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

const UserSchema = new Schema({
    // a user needs to have a name
    name: {
        type: String,
        required: [true, 'A user needs to have a name.'],
        unique: [true, 'A user needs to have a unique name'],
    },

    // a list of products this user bought is kept
    bought: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: [],
        autopopulate: true,
    }]
})

// mongoose plugin to always populate fields
UserSchema.plugin(require('mongoose-autopopulate'));

// when a user is deleted all their reviews need to be deleted
// note: use an anonymous function and not a fat arrow function here!
// otherwise 'this' does not refer to the correct object
// use 'next' to indicate that mongoose can go to the next middleware
UserSchema.pre('remove', function(next) {
    // include the product model here to avoid cyclic inclusion
    const Product = mongoose.model('Product')

    // don't iterate here! we want to use mongo operators!
    // this makes sure the code executes inside mongo
    Product.updateMany({}, {$pull: {'reviews': {'user': this._id}}})
        .then(() => next())
})

// export the user model through a caching function
module.exports = getModel('User', UserSchema)
const User = require('../models/user.model')() // note we need to call the model caching function
const Product = require('../models/product.model')() // note we need to call the model caching function

const neo = require('../../neo')
const errors = require('../errors')

async function create(req, res) {
    const user = await User.findOne({name: req.body.user})

    if (!user) {
        res.status(400).end()
        throw errors.EntityNotFoundError(`User with name '${req.body.user}' not found`)
    }

    const review = {
        rating: req.body.rating,
        text: req.body.text,
        user: user._id,
    }

    const product = await Product.findById(req.params.id)
    
    // maybe not necessary any more now that we store it in neo?
    // BEWARE: atomicity issues!
    product.reviews.push(review)
    await product.save()

    const session = neo.session()

    await session.run(neo.review, {
        userId: user._id.toString(),
        productId: product._id.toString(),
        rating: review.rating,
    })

    res.status(201).end()
}

module.exports = {
    create,
}
const Product = require('../models/product.model')() // note we need to call the model caching function
const User = require('../models/user.model')() // note we need to call the model caching function

const errors = require('../errors')

async function purchase(req, res) {
    const product = await Product.findById(req.params.id)

    if(!product) {
        throw new errors.EntityNotFoundError(`Product with id '${req.params.id}' not found`)
    }

    if(!req.body.user) {
        throw new errors.EntityNotFoundError('User is required to purchase a product')
    }

    await User.updateOne({name: req.body.user}, {
        $push: {
            bought: product._id
        }
    })

    res.status(201).end()
}

module.exports = {
    purchase,
}
const User = require('../models/user.model')() // note we need to call the model caching function
const Product = require('../models/product.model')() // note we need to call the model caching function

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

    await Product.updateOne({_id: req.params.id}, {
        $push: {
            reviews: review,
        },
    }, {runValidators: true})

    res.status(201).end()
}

module.exports = {
    create,
}
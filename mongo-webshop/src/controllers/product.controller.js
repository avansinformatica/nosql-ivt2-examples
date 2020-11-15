const Product = require('../models/product.model')() // note we need to call the model caching function
const User = require('../models/user.model')() // note we need to call the model caching function

async function purchase(req, res) {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(404).end()
        return
    }

    if(!req.body.user) {
        res.status(400).end()
        return
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
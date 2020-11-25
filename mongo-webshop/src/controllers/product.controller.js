const Product = require('../models/product.model')() // note we need to call the model caching function
const User = require('../models/user.model')() // note we need to call the model caching function

const neo = require('../../neo')

const errors = require('../errors')

async function purchase(req, res) {
    // check whether request is valid
    if(!req.body.user) {
        throw new errors.EntityNotFoundError('User is required to purchase a product')
    }

    // get the product from the db and check whether we have such a product
    const product = await Product.findById(req.params.id)
    if(!product) {
        throw new errors.EntityNotFoundError(`Product with id '${req.params.id}' not found`)
    }

    // add the product to the bought list of the user
    const user = await User.findOne({name: req.body.user})

    // maybe not necessary any more now that we store it in neo?
    // BEWARE: atomicity issues!
    user.bought.push(product._id)
    await user.save()

    // open a neo session
    const session = neo.session()

    // store the purchase in neo
    await session.run(neo.purchase, {
        productId: product._id.toString(),
        userId: user._id.toString(),
    })

    // close the neo session
    session.close()

    res.status(201).end()
}

module.exports = {
    purchase,
}
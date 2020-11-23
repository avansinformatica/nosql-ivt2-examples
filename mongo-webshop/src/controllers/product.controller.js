const Product = require('../models/product.model')() // note we need to call the model caching function
const User = require('../models/user.model')() // note we need to call the model caching function

const neo = require('../../neo')

const errors = require('../errors')

async function purchase(req, res) {
    const product = await Product.findById(req.params.id)

    if(!product) {
        throw new errors.EntityNotFoundError(`Product with id '${req.params.id}' not found`)
    }

    if(!req.body.user) {
        throw new errors.EntityNotFoundError('User is required to purchase a product')
    }

    const user = await User.findOne({name: req.body.user})
    
    user.bought.push(product._id)

    await user.save()
    // , {
    //     $push: {
    //         bought: product._id
    //     }
    // })

    try {
        const session = neo.session()
        await session.run(neo.purchase, {
            productId: product._id.toString(),
            userId: user._id.toString(),
        })
        session.close()
    } catch (err) {
        console.log(err)
    }

    res.status(201).end()
}

module.exports = {
    purchase,
}
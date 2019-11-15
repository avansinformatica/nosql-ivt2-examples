const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Product = require('../models/product.model')


// create a new product
router.post('/', async function(req, res) {
    const product = new Product(req.body)

    try {
        await product.save()
    } catch {
        res.status(400).end()
        return
    }

    res.status(200).send({id: product.id})
})

// get all products
router.get('/', async function(req, res) {
    const products = await Product.find()

    res.status(200).send(products)
})

// get a product
router.get('/:id', async function(req, res) {
    const product = await Product.findById(req.params.id)

    res.status(200).send(product)
})

// purchase a product
router.post('/:id/purchase', async function(req, res) {
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

    res.status(200).end()
})

module.exports = router

const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')

const productCrudController = new CrudController(Product)
const productController = require('../controllers/product.controller')


// create a product
router.post('/', productCrudController.create)

// get all products
router.get('/', productCrudController.getAll)

// get a product
router.get('/:id', productCrudController.getOne)

// update a product
router.put('/:id', productCrudController.update)

// remove a product
router.delete('/:id', productCrudController.delete)

// purchase a product (not entirely restful *blush*)
router.post('/:id/purchase', productController.purchase)

module.exports = router

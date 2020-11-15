const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review.controller')


// create a new review
router.post('/product/:id/review', reviewController.create)


module.exports = router
const express = require('express')
const router = express.Router()

const recommendationController = require('../controllers/recommendation.controller')

// maybe better with query params, wink wink, hint hint

router.get('/user/:id/recommendations/simple', recommendationController.simple)

router.get('/user/:id/recommendations/similar', recommendationController.similar)

router.get('/user/:id/recommendations/reviewed', recommendationController.reviewed)

module.exports = router
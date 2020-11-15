const express = require('express')
const router = express.Router()

const registerCrud = require('./crud')

const User = require('../models/user.model')() // note we need to call the model caching function

registerCrud(router, User)


module.exports = router
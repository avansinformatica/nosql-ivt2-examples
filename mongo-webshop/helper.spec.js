// reads the .env file and stores it as environment variables, use for config
require('dotenv').config()

const mongoose = require('mongoose')
const mongooseConnect = require('./connect')

const User = require('./src/models/user.model')() // note we need to call the model caching function
const Product = require('./src/models/product.model')() // note we need to call the model caching function

// connect to the database
mongooseConnect(process.env.TEST_DB)

// drop both collections before each test
beforeEach(async () => {
    await Promise.all([User.deleteMany(), Product.deleteMany()])
});
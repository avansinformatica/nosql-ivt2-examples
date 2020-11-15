// reads the .env file and stores it as environment variables, use for config
require('dotenv').config()

const mongoose = require('mongoose')

const User = require('./src/models/user.model')() // note we need to call the model caching function
const Product = require('./src/models/product.model')() // note we need to call the model caching function

// open a connection to the test database (don't use production database!)
before(function(done) {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }

    mongoose.connect(`${process.env.MONGO_URL}/${process.env.TEST_DB}`, options)
    .then(() => {console.log('connection to test DB established')})
    .then(() => done())
    .catch(err => done(err))
})

// drop both collections before each test
beforeEach(async () => {
    await Promise.all([User.deleteMany(), Product.deleteMany()])
});
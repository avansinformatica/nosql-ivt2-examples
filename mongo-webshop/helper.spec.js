const mongoose = require('mongoose')

const User = require('./src/models/user.model')
const Product = require('./src/models/product.model')

// open a connection to the test database (don't use production database!)
before(function(done) {
    mongoose.connect('mongodb://localhost:27017/webshoptest', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('connection to test DB established')})
    .then(() => done())
    .catch(err => done(err))
})

// drop both collections before each test
beforeEach(async () => {
    await Promise.all([User.deleteMany(), Product.deleteMany()])
});
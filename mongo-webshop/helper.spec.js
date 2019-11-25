const mongoose = require('mongoose')

const User = require('./src/models/user.model')
const Product = require('./src/models/product.model')

// open a connection to the test database (don't use production database!)
before(function(done) {
    mongoose.connect('mongodb://localhost:27017/webshoptest', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => done())
    .catch(err => done(err))
})

// drop both collections before each test
beforeEach(async () => {
    // dropping a collection removes indexes :'(

    // const {users, products} = mongoose.connection.collections;

    // users.drop(() => {
    //     products.drop(() => {
    //         done();
    //     })
    // })

    await Promise.all([User.deleteMany(), Product.deleteMany()])
});
const mongoose = require('mongoose')

// open a connection to the test database (don't use production database!)
before(function(done) {
    mongoose.connect('mongodb://localhost:27017/webshoptest', {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => done())
    .catch(err => done(err))
})

// drop both collections before each test
beforeEach((done) => {
    const {users, products} = mongoose.connection.collections;

    users.drop(() => {
        products.drop(() => {
            done();
        })
    })
});
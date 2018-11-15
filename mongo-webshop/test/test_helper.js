const mongoose = require('mongoose');

// use ES6 promises
mongoose.Promise = global.Promise;

// connect to the database before running any tests
before((done) => {
    mongoose.connect(
        'mongodb://localhost/webshop', 
        {useNewUrlParser: true}
    );
    mongoose.connection
        .once('open', () => done())
        .on('error', (error => {
            console.warn('Warning', error);
        }));
});


// drop both collections before each test
beforeEach((done) => {
    const {users, products} = mongoose.connection.collections;
    users.drop(() => {
        products.drop(() => {
            done();
        })
    })
});
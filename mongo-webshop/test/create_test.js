const assert = require('assert');
const User = require('../src/user.model');
const Product = require('../src/product.model');

describe('Creating operations', () => {    
    it('can create a new user with the correct name', (done) => {
        // create a user
        const joe = new User({
            name: 'Joe',
        });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                // check that joe is not new any more
                assert(!joe.isNew);
                // check that we found a user with the correct name
                // use strictEqual to get better help when test fails
                assert.strictEqual(user.name, 'Joe');
                // call done when all checks are completed
                done();
            })
            // return with the error if one occurs
            .catch(err => done(err));
    });
        
    it('will create a user with an empty bought array', (done) => {
        const joe = new User({
            name: 'Joe',
        });
        
        joe.save()
        .then(() => User.findOne())
        .then((user) => {
            // check that the bought array of joe is empty
            assert.strictEqual(user.bought.length, 0);
            done();
        })
        // return with the error if one occurs
        .catch(err => done(err));
    });
        
    it('requires a user name', (done) => {
        const anon = new User({});
        
        anon.save()
            // the test should fail when the save succeeds
            .then(() => {
                assert(false);
                done();
            })
            // check the message of the error
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;
                assert.strictEqual(message, 'A user needs to have a name.');
                done();
            })
            // other errors also make the test fail
            .catch(err => done(err));
    });

    it('can create a new product', (done) => {
        const camera = new Product({
            name: 'Camera X120',
            description: 'A cool camera.',
            price: 129.99,
        });

        camera.save()
            .then(() => Product.findOne({name: 'Camera X120'}))
            .then((product) => {
                assert(!camera.isNew);
                assert.strictEqual(product.name, 'Camera X120');
                assert.strictEqual(product.price, 129.99);
                assert.strictEqual(product.description, 'A cool camera.')
                done();
            })
            .catch(err => done(err));
    });
});
const assert = require('assert');
const User = require('../src/user.model');
const Product = require('../src/product.model');

describe('Review testing', () => {
    let camera;
    let joe;

    // create some documents in the database before each test
    beforeEach((done) => {
        camera = new Product({
            name: 'Camera X120',
            description: 'A cool camera.',
            price: 129.99,
        });
        joe = new User({
            name: 'Joe'
        });

        // note how mongoose takes care of references to object ids!
        camera.reviews.push({
            text: 'Nice camera!',
            rating: 5,
            user: joe // becomes a reference
        });
        camera.reviews.push({
            rating: 4,
            user: joe // becomes a reference
        });

        // wait for both save operations to finish
        Promise.all([camera.save(), joe.save()])
            .then(() => done())
            .catch(err => done(err));
    });

    it('can add reviews to products', (done) => {
        Product.findOne({name: 'Camera X120'})
            // fetch the user document from mongo
            // this is like a join, but done inside mongoose!
            .populate('reviews.user') 
            .then((product) => {
                // sanity check
                assert.strictEqual(product.name, 'Camera X120');
                // check whether the reviews were added
                assert.strictEqual(product.reviews.length, 2);
                // check the virtual product rating
                assert.strictEqual(product.rating, 4.5);
                // check whether the user was populated
                assert.strictEqual(product.reviews[0].user.name, 'Joe');
                done();
            })
            .catch(err => done(err));
    });

    it('deletes reviews when deleting a user', (done) => {
        joe.remove()
            .then(() => Product.findOne({name: 'Camera X120'}))
            .then((product) => {
                assert.strictEqual(product.reviews.length, 0);
                done();
            })
            .catch(err => done(err));
    });
});
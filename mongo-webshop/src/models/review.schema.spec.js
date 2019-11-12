const expect = require('chai').expect

const User = require('./user.model')
const Product = require('./product.model')


describe('review schema', function() {
    let user

    beforeEach(async function() {
        user = {
            name: 'Joe'
        }

        const savedUser = await new User(user).save()
        user['id'] = savedUser._id
    })

    it('should reject a rating of 3.5', function() {
        const testProduct = {
            name: 'Camera X120',
            description: 'A cool camera',
            price: 259,
            reviews: [
                {
                    rating: 3.5,
                    text: 'Pretty average camera',
                    user: user.id
                }
            ]
        }

        expect(async () => {
            await new Product(testProduct).save()
        }).to.throw
    })

    it('should compute an average rating of a product', async function() {
        const testProduct = new Product({
            name: 'Camera X120',
            description: 'A cool camera',
            price: 259,
            reviews: [{
                rating: 4,
                text: 'Pretty average camera',
                user: user.id
            }, {
                rating: 3,
                text: 'Changed my mind for the worse',
                user: user.id
            }]
        })

        await testProduct.save()
    
        expect(testProduct).to.have.property('rating', 3.5)
    })
})
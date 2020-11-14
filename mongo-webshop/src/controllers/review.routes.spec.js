const chai = require('chai')
const expect = chai.expect

const requester = require('../../requester.spec')

const User = require('../models/user.model')() // note we need to call the model caching function
const Product = require('../models/product.model')() // note we need to call the model caching function

describe('review endpoints', function() {
    describe('integration tests', function() {
        let testUser
        let testProduct
    
        beforeEach(async function() {
            testUser = await new User({
                name: 'Joe'
            }).save()
    
            testProduct = await new Product({
                name: 'Camera X120',
                description: 'A cool camera',
                price: 259
            }).save()
        })
    
        it('(POST /review) should create a new review', async function() {
            const testReview = {
                rating: 3,
                text: 'Pretty average camera',
                user: testUser.name
            }

            const res = await requester.post(`/product/${testProduct.id}/review`).send(testReview)
    
            expect(res).to.have.status(200)
    
            const product = await Product.findById(testProduct.id)
            expect(product).to.have.property('name', testProduct.name)
            expect(product).to.have.property('reviews').of.length(1)
            const review = product.reviews[0]
            expect(review).to.have.property('rating', testReview.rating)
            expect(review).to.have.property('text', testReview.text)
            expect(review).to.have.property('user')
            expect(review.user.toString()).to.equal(testUser.id.toString())
        })
    
        it('(POST /review) should not create a review with a negative rating', async function() {
            const testReview = {
                rating: -3,
                text: 'Pretty average camera',
                user: testUser.name
            }
    
            const res = await requester.post(`/product/${testProduct.id}/review`).send(testReview)
    
            expect(res).to.have.status(400)
    
            const product = await Product.findById(testProduct.id)
            expect(product).to.have.property('name', testProduct.name)
            expect(product).to.have.property('reviews').and.to.be.empty
        })
    
        it('(DELETE /user/:id) should remove all reviews when deleting a user', async function() {
            const testReview = {
                rating: -3,
                text: 'Pretty average camera',
                user: testUser.id
            }
    
            await Product.updateOne({name: testProduct.name}, {
                $push: {
                    reviews: testReview
                }
            })
            const productBefore = await Product.findById(testProduct.id)
            expect(productBefore).to.have.property('reviews').of.length(1)
    
            const res = await requester.delete(`/user/${testUser.id}`)
            expect(res).to.have.status(200)
    
            const productAfter = await Product.findById(testProduct.id)
            expect(productAfter).to.have.property('reviews').to.be.empty
        })
    })

    describe('system tests', function() {
        // there is currently not a system test that tests only on review endpoints...
    })
})
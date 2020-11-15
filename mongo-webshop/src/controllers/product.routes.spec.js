const chai = require('chai')
const expect = chai.expect

const requester = require('../../requester.spec')

const Product = require('../models/product.model')() // note we need to call the model caching function

describe('product endpoints', function() {
    describe('integration tests', function() {
        it('(POST /product) should create a product', async function() {
            const testProduct = {
                name: 'Camera X120',
                description: 'A cool camera',
                price: 259
            }

            const res = await requester.post('/product').send(testProduct)

            expect(res).to.have.status(201)
            expect(res.body).to.have.property('id')
    
            const product = await Product.findOne({name: testProduct.name})
            expect(product).to.have.property('name', testProduct.name)
            expect(product).to.have.property('description', testProduct.description)
            expect(product).to.have.property('price', testProduct.price)
            expect(product).to.have.property('reviews').and.to.be.empty
        })

        it('(POST /product) should create a product with a promise chain', function() {
            const testProduct = {
                name: 'Camera X120',
                description: 'A cool camera',
                price: 259
            }

            return requester
                .post('/product')
                .send(testProduct)
                .then(res => {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('id')
                    return Product.findOne({name: testProduct.name})
                })
                .then(product => {
                    expect(product).to.have.property('name', testProduct.name)
                    expect(product).to.have.property('description', testProduct.description)
                    expect(product).to.have.property('price', testProduct.price)
                    expect(product).to.have.property('reviews').and.to.be.empty
                })
        })
    
        it('(POST /product) should not create a product with missing name', async function() {
            const testProduct = {
                description: 'A cool camera without a name',
                price: 129,
            }
    
            const res = await requester.post('/product').send(testProduct)
    
            expect(res).to.have.status(400)
    
            const count = await Product.find().countDocuments()
            expect(count).to.equal(0)
        })
    })

    describe('system tests', function() {
        it('should create and retrieve a product', async function() {
            const testProduct = {
                name: 'Camera X120',
                description: 'A cool camera',
                price: 259
            }

            const res1 = await requester.post('/product').send(testProduct)
            expect(res1).to.have.status(201)
            expect(res1.body).to.have.property('id')

            const id = res1.body.id
            const res2 = await requester.get(`/product/${id}`)
            expect(res2).to.have.status(200)
            expect(res2.body).to.have.property('_id', id)
            expect(res2.body).to.have.property('name', testProduct.name)
            expect(res2.body).to.have.property('description', testProduct.description)
            expect(res2.body).to.have.property('price', testProduct.price)
            expect(res2.body).to.have.property('reviews').to.be.empty
        })
    })
})
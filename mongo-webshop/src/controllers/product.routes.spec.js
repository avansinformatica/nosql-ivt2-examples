const chai = require('chai')
const expect = chai.expect

const requester = require('../../requester')

const Product = require('../models/product.model')

describe('product endpoints', function() {
    it('(POST /product) should create a product', async function() {
        const testProduct = {
            name: 'Camera X120',
            description: 'A cool camera',
            price: 259
        }

        const res = await requester.post('/product').send(testProduct)

        expect(res).to.have.status(200)

        const product = await Product.findOne({name: testProduct.name})
        expect(product).to.have.property('name', testProduct.name)
        expect(product).to.have.property('description', testProduct.description)
        expect(product).to.have.property('price', testProduct.price)
        expect(product).to.have.property('reviews').and.to.be.empty
    })

    it('(POST /product) should not create a product with missing price', async function() {
        const testProduct = {
            description: 'A cool camera without a name',
            price: 129
        }

        const res = await requester.post('/product').send(testProduct)

        expect(res).to.have.status(400)

        const count = await Product.find().countDocuments()
        expect(count).to.equal(0)
    })
})
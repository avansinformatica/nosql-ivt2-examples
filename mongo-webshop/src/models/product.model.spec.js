const expect = require('chai').expect

const Product = require('./product.model')


describe('product model', function() {
    it('should reject a negative price', function() {
        const testProduct = {
            name: 'Camera X120',
            description: 'A cool camera',
            price: -129
        }

        expect(async () => {
            await new Product(testProduct).save()
        }).to.throw
    })

    it('should reject a missing price', function() {
        const testProduct = {
            name: 'Camera X120',
            description: 'A cool camera'
        }

        expect(async () => {
            await new Product(testProduct).save()
        }).to.throw
    })
})
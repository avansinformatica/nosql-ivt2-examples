const chai = require('chai')
const expect = chai.expect

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const Product = require('./product.model')() // note we need to call the model caching function


describe('product model', function() {
    describe('unit tests', function() {
        it('should reject a negative price', async function() {
            const testProduct = {
                name: 'Camera X120',
                description: 'A cool camera',
                price: -129
            }
    
            await expect(new Product(testProduct).save()).to.be.rejectedWith(Error)
        })
    
        it('should reject a missing price', async function() {
            const testProduct = {
                name: 'Camera X120',
                description: 'A cool camera'
            }
    
            await expect(new Product(testProduct).save()).to.be.rejectedWith(Error)
        })
    })
})
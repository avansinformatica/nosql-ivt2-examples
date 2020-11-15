const chai = require('chai')
const expect = chai.expect

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const User = require('./user.model')() // note we need to call the model caching function

describe('user model', function() {
    describe('unit tests', function() {
        it('should reject a missing user name', async function() {
            const user = new User({})
    
            await expect(user.save()).to.be.rejectedWith(Error)
        })
    
        it('should create an empty bought list by default', async function() {
            const user = await new User({name: 'Jane'}).save()
    
            expect(user).to.have.property('bought').and.to.be.empty
        })
    
        it('should not create duplicate user names', async function() {
            await new User({name: 'Joe'}).save()
            const user = new User({name: 'Joe'})
            
            await expect(user.save()).to.be.rejectedWith(Error)
    
            let count = await User.find().countDocuments()
            expect(count).to.equal(1)
        })
    })
})
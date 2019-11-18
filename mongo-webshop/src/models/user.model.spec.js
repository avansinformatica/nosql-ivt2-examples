const chai = require('chai')
const expect = chai.expect

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const User = require('./user.model')

describe('user model', function() {
    it('should reject a missing user name', async function() {
        const user = new User({})

        await expect(user.save()).to.be.rejectedWith(Error)
    })

    it('should create an empty bought list by default', async function() {
        const user = await new User({name: 'Jane'}).save()

        expect(user).to.have.property('bought').and.to.be.empty
    })
})
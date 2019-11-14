const expect = require('chai').expect

const User = require('./user.model')

describe('user model', function() {
    it('should reject a missing user name', function() {
        const user = new User({})

        expect(async () => {
            user.save()
        }).to.throw
    })

    it('should create an empty bought list by default', async function() {
        const user = await new User({name: 'Jane'}).save()

        expect(user).to.have.property('bought').and.to.be.empty
    })
})
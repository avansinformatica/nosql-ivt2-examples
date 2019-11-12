const chai = require('chai')
const expect = chai.expect

const requester = require('../../requester')

const User = require('../models/user.model')


describe('user endpoints', function() {
    it('(POST /user) should create a new user', async function() {
        const testName = 'Joe'

        const res = await requester.post('/user').send({name: testName})

        expect(res).to.have.status(200)

        const user = await User.findOne({name: testName})
        expect(user).to.have.property('name', testName)
        expect(user).to.have.property('bought').and.to.be.empty
    })

    it('(POST /user) should not create a user without a name', async function() {
        const res = await requester.post('/user').send({garbage: 'some text'})

        expect(res).to.have.status(400)

        const docCount = await User.find().countDocuments()
        expect(docCount).to.equal(0)
    })

    it('(GET /user) should give all users', async function() {
        const testNameA = 'Joe'
        const testNameB = 'Jane'

        const qA = new User({name: testNameA}).save()
        const qB = new User({name: testNameB}).save()

        await Promise.all([qA, qB])

        const res = await requester.get('/user')

        expect(res).to.have.status(200)
        expect(res.body).to.have.length(2)
        expect(res.body[0]).to.have.property('name', testNameA)
        expect(res.body[0]).to.have.property('bought').and.to.be.empty
        expect(res.body[1]).to.have.property('name', testNameB)
        expect(res.body[1]).to.have.property('bought').and.to.be.empty
    })

    it('(GET /user/:id) should give a user', async function() {
        const testUser = new User({
            name: 'Joe'
        })

        await testUser.save()

        const res = await requester.get(`/user/${testUser._id}`)

        expect(res).to.have.status(200)
        expect(res.body).to.have.property('name', testUser.name)
        expect(res.body).to.have.property('bought').and.to.be.empty
    })

    it('(DELETE /user/:id) should delete a user', async function() {
        const testUser = new User({
            name: 'Joe'
        })

        await testUser.save()

        const res = await requester.delete(`/user/${testUser._id}`)

        expect(res).to.have.status(200)

        const user = await User.findOne({name: testUser.name})
        expect(user).to.be.null
    })
})
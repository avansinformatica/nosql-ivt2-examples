const chai = require('chai')
const expect = chai.expect

const requester = require('../../requester.spec')

const User = require('../models/user.model')() // note we need to call the model caching function


describe('user endpoints', function() {
    describe('integration tests', function() {
        it('(POST /user) should create a new user', async function() {
            const testName = 'Joe'
    
            const res = await requester.post('/user').send({name: testName})
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('id')
    
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
    
            await new User({name: testNameA}).save()
            await new User({name: testNameB}).save()
    
            const res = await requester.get('/user')
    
            expect(res).to.have.status(200)
            const users = res.body
            users.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : 1)
            expect(users).to.have.length(2)
            expect(users[0]).to.have.property('name', testNameB)
            expect(users[0]).to.have.property('bought').and.to.be.empty
            expect(users[1]).to.have.property('name', testNameA)
            expect(users[1]).to.have.property('bought').and.to.be.empty
        })
    
        it('(GET /user/:id) should give a user', async function() {
            const testUser = new User({
                name: 'Joe'
            })
    
            await testUser.save()
    
            const res = await requester.get(`/user/${testUser.id}`)
    
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('name', testUser.name)
            expect(res.body).to.have.property('bought').and.to.be.empty
        })
    
        it('(DELETE /user/:id) should delete a user', async function() {
            const testUser = new User({
                name: 'Joe'
            })
    
            await testUser.save()
    
            const res = await requester.delete(`/user/${testUser.id}`)
    
            expect(res).to.have.status(204)
    
            const user = await User.findOne({name: testUser.name})
            expect(user).to.be.null
        })
    })

    describe('system tests', function() {
        it('should create two users and retrieve a list of users', async function() {
            const testUserA = {
                name: 'Joe'
            }
            const testUserB = {
                name: 'Jane'
            }

            const res1 = await requester.post('/user').send(testUserA)
            expect(res1).to.have.status(201)
            expect(res1.body).to.have.property('id')
            testUserA.id = res1.body.id
            const res2 = await requester.post('/user').send(testUserB)
            expect(res2).to.have.status(201)
            expect(res2.body).to.have.property('id')
            testUserB.id = res2.body.id

            const res3 = await requester.get('/user')
            expect(res3).to.have.status(200)
            expect(res3.body).to.have.length(2)

            for (let user of res3.body) {
                let referenceUser

                if (user._id == testUserA.id) {
                    referenceUser = testUserA
                } else if (user._id == testUserB.id) {
                    referenceUser = testUserB
                } else {
                    throw new Error("User id is invalid")
                }

                expect(user._id).to.equal(referenceUser.id)
                expect(user.name).to.equal(referenceUser.name)
                expect(user.bought).to.be.empty
            }
        })
    })
})
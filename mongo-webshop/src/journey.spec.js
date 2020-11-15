const chai = require('chai')
const expect = chai.expect

const requester = require('../requester.spec')


describe('user journeys', function() {
    it('create product; create user; user buys product; user leaves review', async function() {
        let res

        const testProduct = {
            name: 'Camera X120',
            description: 'A cool camera',
            price: 259
        }
        res = await requester.post('/product').send(testProduct)
        expect(res).to.have.status(201)
        testProduct.id = res.body.id

        const testUser = {name: 'Joe'}

        res = await requester.post('/user').send(testUser)
        expect(res).to.have.status(201)
        testUser.id = res.body.id

        res = await requester.post(`/product/${testProduct.id}/purchase`).send({user: testUser.name})
        expect(res).to.have.status(201)

        const testReview = {
            user: testUser.name,
            rating: 3,
            text: 'Pretty average camera'
        }
        res = await requester.post(`/product/${testProduct.id}/review`).send(testReview)
        expect(res).to.have.status(201)

        res = await requester.get(`/product/${testProduct.id}`)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('name', testProduct.name)
        expect(res.body).to.have.property('description', testProduct.description)
        expect(res.body).to.have.property('price', testProduct.price)
        expect(res.body).to.have.property('reviews').and.to.have.length(1)
        const productReview = res.body.reviews[0]
        expect(productReview).to.have.property('rating', testReview.rating)
        expect(productReview).to.have.property('text', testReview.text)
        expect(productReview.user.toString()).to.equal(testUser.id)

        res = await requester.get(`/user/${testUser.id}`)
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('name', testUser.name)
        expect(res.body).to.have.property('bought').and.to.be.length(1)
        const userReview = res.body.bought[0]
        expect(userReview).to.have.property('name', testProduct.name)
        expect(userReview).to.have.property('description', testProduct.description)
        expect(userReview).to.have.property('price', testProduct.price)
    })
})
const chai = require('chai')
const expect = chai.expect

const Product = require('../models/product.model')()

const requester = require('../../requester.spec')

const neo = require('../../neo')

function createQueries(id1, id2, id3, id4, id5) {
    return [
        `CREATE (:User {id:"user1"})-[:BOUGHT]->(:Product {id:"${id1.toString()}"})`,
        `CREATE (:User {id:"user2"})-[:BOUGHT]->(:Product {id:"${id2.toString()}"})`,
        `MATCH (u:User {id:"user1"}) MATCH (p:Product {id:"${id2.toString()}"}) CREATE (u)-[:BOUGHT]->(p)`,
        `MATCH (u:User {id:"user2"}) MATCH (p:Product {id:"${id1.toString()}"}) CREATE (u)-[:BOUGHT]->(p)`,
        `MATCH (u:User {id:"user2"}) MERGE (p:Product {id:"${id3.toString()}"}) CREATE (u)-[:BOUGHT]->(p)`,
        `CREATE (:User {id:"user3"})-[:REVIEWED {rating:4}]->(:Product {id:"${id4.toString()}"})`,
        `CREATE (:Product {id:"${id5.toString()}"})`,
        `MATCH (u:User {id:"user3"}) MATCH (p:Product {id:"${id5.toString()}"}) CREATE (u)-[:REVIEWED {rating:3}]->(p)`,
        `MATCH (u:User {id:"user3"}) MATCH (p:Product {id:"${id2.toString()}"}) CREATE (u)-[:REVIEWED {rating: 5}]->(p)`,
        `MATCH (u:User {id:"user3"}) MATCH (p:Product {id:"${id2.toString()}"}) CREATE (u)-[:BOUGHT]->(p)`,
        `MATCH (u:User {id:"user3"}) MATCH (p:Product {id:"${id4.toString()}"}) CREATE (u)-[:BOUGHT]->(p)`,
        `MATCH (u:User {id:"user3"}) MATCH (p:Product {id:"${id5.toString()}"}) CREATE (u)-[:BOUGHT]->(p)`,
    ]
}

describe('recommendation routes', () => {
    describe('integration tests', () => {
        beforeEach(async function() {
            const prod1 = new Product({
                name: "product 1",
                price: 1,
            })
            const prod2 = new Product({
                name: "product 2",
                price: 2,
            })
            const prod3 = new Product({
                name: "product 3",
                price: 3,
            })
            const prod4 = new Product({
                name: "product 4",
                price: 4,
            })
            const prod5 = new Product({
                name: "product 5",
                price: 5,
            })

            await Promise.all([prod1.save(), prod2.save(), prod3.save(), prod4.save(), prod5.save()])

            const session = neo.session()

            for (let query of createQueries(prod1._id, prod2._id, prod3._id, prod4._id, prod5._id)) {
                await session.run(query)
            }

            session.close()
        })

        it('gives simple recommendations', async function() {
            const res = await requester.get('/user/user1/recommendations/simple')

            expect(res.body).to.have.length(3)
            const names = res.body.map(product => product.name)
            expect(names).to.have.members(['product 3', 'product 4', 'product 5'])
        })

        it('gives similarity recommendations', async function() {
            const res = await requester.get('/user/user1/recommendations/similar')

            expect(res.body).to.have.length(1)
            const names = res.body.map(product => product.name)
            expect(names).to.have.members(['product 3'])
        })

        it('gives reviewed recommendations', async function() {
            const res = await requester.get('/user/user1/recommendations/reviewed')

            expect(res.body).to.have.length(1)
            const names = res.body.map(product => product.name)
            expect(names).to.have.members(['product 4'])
        })
    })
})
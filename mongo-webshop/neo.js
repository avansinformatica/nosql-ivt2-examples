const neo4j = require('neo4j-driver')

function connect(dbName) {
    this.dbName = dbName
    this.driver = neo4j.driver(
        process.env.NEO4J_URL,
        neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    )
}

function session() {
    return this.driver.session({
        database: this.dbName,
        defaultAccessMode: neo4j.session.WRITE
    })
}

module.exports = {
    connect,
    session,
    dropAll: 'MATCH (n) DETACH DELETE n',
    purchase: 'MERGE (product:Product {id:$productId}) MERGE (user:User {id: $userId}) MERGE (user)-[:BOUGHT]->(product)',
    review: 'MERGE (product:Product {id:$productId}) MERGE (user:User {id:$userId}) MERGE (user)-[:REVIEWED {rating:$rating}]->(product)',
    // recommend products reviewers rated with 4 or 5 stars if you bought a product reviewed with 4 or 5 stars
    recommendReviewed: 'MATCH (usr:User {id:$userId})-[:BOUGHT]->(:Product)<-[review:REVIEWED]-(reviewer:User) WHERE review.rating >= 4 WITH DISTINCT reviewer, usr MATCH (reviewer)-[review:REVIEWED]->(product:Product) WHERE review.rating >= 4 AND NOT (usr)-[:BOUGHT]->(product) RETURN DISTINCT product',
    // recommend other products of users that have bought the same product as you
    recommendSimilar: 'MATCH (usr:User {id:$userId})-[:BOUGHT*2]-(other:User) WITH DISTINCT usr, other MATCH (other)-[:BOUGHT]->(product:Product) WHERE NOT (usr)-[:BOUGHT]->(product) RETURN DISTINCT product',
    // recommend other products of users that have bought at least n the same products as you
    recommendSimilarTwo: 'MATCH (usr:User {id:$userId})-[:BOUGHT]->(product:Product)<-[:BOUGHT]-(other:User) WITH usr, other, count(DISTINCT product) as productCount WHERE productCount >= $numSame MATCH (other)-[:BOUGHT]->(product:Product) WHERE NOT (usr)-[:BOUGHT]->(product) RETURN product'
}
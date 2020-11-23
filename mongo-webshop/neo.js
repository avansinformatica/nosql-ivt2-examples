const neo4j = require('neo4j-driver')

function connect(dbName) {
    db_name = dbName
    this.driver = neo4j.driver(
        process.env.NEO4J_URL,
        neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    )
}

function session() {
    return this.driver.session({
        database: db_name,
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
    recommendReviewd: '',
    // recommend other products of users that have bought at least 2 the same products as you
    recommendSimilar: ''
}
const neo = require('../../neo')

const Product = require('../models/product.model')()

async function getRecommendations(query, req, res) {
    const session = neo.session()
    
    const result = await session.run(query, {
        userId: req.params.id,
    })

    // we only expect 1 row with results, containing an array of product ids in the field 'productIds'
    // see the queries in neo.js for what is returned
    const productIds = result.records[0].get('productIds')
    
    session.close()
    
    const recommendations = await Product.find({_id: {$in: productIds}})
    
    res.status(200).json(recommendations)
}

async function simple(req, res) {
    await getRecommendations(neo.recommendSimilar, req, res)
}

async function similar(req, res) {
    await getRecommendations(neo.recommendSimilarTwo, req, res)
}

async function reviewed(req, res) {
    await getRecommendations(neo.recommendReviewed, req, res)
}

module.exports = {
    simple,
    similar,
    reviewed,
}
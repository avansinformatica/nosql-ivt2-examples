const neo = require('../../neo')

const Product = require('../models/product.model')()

async function getRecommendations(query, req, res) {
    const session = neo.session()
    
    const result = await session.run(query, {
        userId: req.params.id,
    })
    
    const products = []
    for (let record of result.records) {
        products.push(record.get('product').properties.id)
    }
    
    // or in a functional approach
    // const products = result.records.map(record => record.get('product').properties.id)
    
    session.close()
    
    const recommendations = await Product.find({_id: {$in: products}})
    
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
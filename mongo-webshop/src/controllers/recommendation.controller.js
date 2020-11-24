// get product recommendations
const similar = await session.run(neo.recommendSimilar, {
    userId: user._id.toString(),
})

const similarTwo = await session.run(neo.recommendSimilarTwo, {
    userId: user._id.toString(),
})

const similarReview = await session.run(neo.recommendReviewed, {
    userId: user._id.toString(),
})
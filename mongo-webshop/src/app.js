const express = require('express')
const app = express()

// parse json body of incoming request
app.use(express.json())

const userRoutes = require('./controllers/user.routes')
const productRoutes = require('./controllers/product.routes')
const reviewRoutes = require('./controllers/review.routes')

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/', reviewRoutes)

// export the app object for use elsewhere
module.exports = app
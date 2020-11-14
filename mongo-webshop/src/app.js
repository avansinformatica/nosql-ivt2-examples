const express = require('express')
const app = express()

const morgan = require('morgan')

// parse json body of incoming request
app.use(express.json())

// use morgan for logging
app.use(morgan('dev'))

const userRoutes = require('./controllers/user.routes')
const productRoutes = require('./controllers/product.routes')
const reviewRoutes = require('./controllers/review.routes')

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/', reviewRoutes)

// export the app object for use elsewhere
module.exports = app
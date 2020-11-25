const express = require('express')

// this catches an exception in a route handler and calls next with it,
// so express' error middleware can deal with it
// saves us a try catch in each route handler
// note: this will be standard in express 5.0, to be released soon
require('express-async-errors')

const app = express()

const cors = require('cors')
const helmet = require('helmet')

const morgan = require('morgan')

// parse json body of incoming request
app.use(express.json())

// enable CORS (cross origin resourse sharing)
// you don't need it for this example, but you will if you host a frontend
// on a different origin (url)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors())

// not the topic of this example, but good to be aware of security issues
// helmet sets headers to avoid common security risks
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet())

// use morgan for logging
app.use(morgan('dev'))

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const reviewRoutes = require('./routes/review.routes')
const recommendationRoutes = require('./routes/recommendation.routes')

const errors = require('./errors')

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/', reviewRoutes)
app.use('/', recommendationRoutes)

// catch all not found response
app.use('*', function(_, res) {
    res.status(404).end()
})

// error responses
app.use('*', function(err, req, res, next) {
    console.error(`${err.name}: ${err.message}`)
    // console.error(err)
    next(err)
})

app.use('*', errors.handlers)

app.use('*', function(err, req, res, next) {
    res.status(500).json({
        message: 'something really unexpected happened'
    })
})

// export the app object for use elsewhere
module.exports = app
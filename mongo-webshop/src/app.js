const express = require('express')
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

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/', reviewRoutes)

// catch all not found response
app.use('*', function(_, res) {
    res.status(404).end()
})

// catch all error response
app.use('*', function(err, req, res, next) {
    console.error(`${err.name}: ${err.message}`)
    next(err)
})

app.use('*', function(err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: 'please supply valid information'
        })
    } else {
        next(err)
    }
})

app.use('*', function(err, req, res, next) {
    res.status(500).json({
        message: 'something really unexpected happened'
    })
})

// export the app object for use elsewhere
module.exports = app
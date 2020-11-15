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
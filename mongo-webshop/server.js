// reads the .env file and stores it as environment variables, use for config
require('dotenv').config()

const mongoose = require('mongoose')

const app = require('./src/app')

// the order of starting the app and connecting to the database does not matter
// since mongoose buffers queries till there is a connection

// start the app
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})

// connect to the database
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}

mongoose.connect(`${process.env.MONGO_URL}/${process.env.PROD_DB}`, options)
.then(() => {
    console.log('MongoDB connection established')
})
.catch(err => {
    console.log('MongoDB connection failed')
    console.log(err)
})
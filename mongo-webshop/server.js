// reads the .env file and stores it as environment variables, use for config
require('dotenv').config()

const mongoose = require('mongoose')

const app = require('./src/app')

// since app inherits from Event Emitter, we can use this to get the app started
// after the database is connected
app.on('databaseConnected', function() {
    const port = process.env.PORT

    app.listen(port, () => {
        console.log(`server is listening on port ${port}`)
    })
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

    // fire the event that the app is ready to listen
    app.emit('databaseConnected')
})
.catch(err => {
    console.log('MongoDB connection failed')
    console.log(err)
})
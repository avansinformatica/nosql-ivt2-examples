const mongoose = require('mongoose')

const app = require('./src/app')

// since app inherits from Event Emitter, we can use this to get the app started
// after the database is connected
app.on('databaseConnected', function() {
    const port = 3000

    app.listen(port, () => {
        console.log(`server is listening on port ${port}`)
    })
})


// connect to the database
mongoose.connect('mongodb://localhost:27017/webshop', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connection established')

    // fire the event that the app is ready to listen
    app.emit('databaseConnected')
})
.catch(err => {
    console.log('MongoDB connection failed')
    console.log(err)
})
const mongoose = require('mongoose');
const { logger, dbHost, dbPort, dbUser, dbDatabase, dbPassword }  = require('./config');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

const dbUrl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + dbUser + ':' + dbPassword + '@' + dbHost + ':' + dbPort + '/' + dbDatabase :
    'mongodb://localhost/' + dbDatabase;

mongoose.connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true
})
var connection = mongoose.connection
    .once('open', () => logger.info(`Connected to Mongo on ${dbHost}:${dbPort}/${dbDatabase}`))
    .on('error', (error) => logger.error(error.toString()));

module.exports = connection;
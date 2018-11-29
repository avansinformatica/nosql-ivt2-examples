const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const neo4j = require('neo4j-driver').v1;
const neo = require('./neo4j_setup');

// make mongoose use ES6 promises
mongoose.Promise = global.Promise;

// connect to mongodb
// mongoose.connect('mongodb://localhost/dating', {useNewUrlParser: true});
mongoose.connect('mongodb://dev:passwd123@ds263109.mlab.com:63109/avansdating', {useNewUrlParser: true});

// connect to neo4j db
neo.driver = neo4j.driver(
    'bolt://hobby-imgbemcofhjngbkeihlmpfbl.dbs.graphenedb.com:24786', 
    neo4j.auth.basic('dev', 'b.KjsQYVOye50q.Wsu6mTnSutd91R39')
);

// on shutdown disconnect from neo4j db
process.on('exit', function() {
    neo.driver.close();
});

// takes incoming requests and handles them
const app = express();

// tell app to use json body parser
// has to be called before routes!
app.use(bodyParser.json());

routes(app);

module.exports = app;
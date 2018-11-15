'use strict';

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const user_routes = require('./routes/user.routes')
const authenticationroutes = require('./routes/authentication.routes')
const personroutes = require('./routes/person.routes')
const person_open_routes = require('./routes/person.open.routes')
const AuthController = require('./controllers/authentication.controller')
const ApiError = require('./model/ApiError')
const { webPort, logger } = require('./config/config')
require('./config/mongo.db');

const port = process.env.PORT || webPort
const httpSchemes = process.env.NODE_ENV === 'production' ? ['https'] : ['http']
const description = '<p>This server allows users to register themselves and to get a list of persons.</p>'

let app = express()
const expressSwagger = require('express-swagger-generator')(app);

let options = {
	swaggerDefinition: {
		info: {
			title: 'Avans User Server',
			version: '1.0.0',
			description: description
		},
		host: process.env.ALLOW_ORIGIN || 'node-persons-server.herokuapp.com',
		produces: [
			"application/json"
		],
		securityDefinitions: {
			JWT: {
				type: "apiKey",
				in: "header",
				name: "Authorization",
				description: "Fill in a valid token below."
			}
		},
		schemes: httpSchemes
	},
	basedir: __dirname,
	files: ['./routes/**/*.js']
}
expressSwagger(options)

// bodyParser parses the body from a request
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({
	'extended': 'true'
})); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

// Instal Morgan as logger
app.use(morgan('dev'))

// Add CORS headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// Serve files from the ./static folder 
app.use(express.static('./static'))

// UNPROTECTED endpoints for authentication - no token required.
// Provide login and registration 
app.use('/api', authenticationroutes)

// GET routes are UNPROTECTED
app.use('/api', person_open_routes)

// JWT TOKEN VALIDATION for authentication
app.use('/api', AuthController.validateToken);

// PROTECTED endpoints
app.use('/api', user_routes)
app.use('/api', personroutes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
	// logger.error('Non-existing endpoint')
	const error = new ApiError('Non-existing endpoint', 404)
	next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	logger.error(err)
	res.status((err.code || 404)).json(err).end()
})

//
// When this server shuts down, we gracefully clean up all the mess behind us.
// This is where we release the database pool.
//
function shutdown() {
	logger.info('shutdown started')
		app.stop()
		// 	.then(() => {
			// pool.end((err) => {
			// 	if (err) {
			// 		logger.info('Error releasing connection in the database pool: ' + err.toString())
			// 		process.exit()
			// 	} else {
			// 		logger.info('All connections in the pool have ended')
			// 		process.exit()
			// 	}
			// })
		// })
		.then(() => {
			logger.info('process is stopping')
		})
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

// Start listening for incoming requests.
app.listen(port, () => {
	logger.info('Server running on port ' + port)
	logger.info('API documentation is available at ./api-docs/')
})

// Testcases need our app - export it.
module.exports = app
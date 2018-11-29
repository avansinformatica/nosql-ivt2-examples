//
// Authentication controller
//
'use strict';

const assert = require('assert')
const ApiError = require('../model/ApiError')
const User = require('../model/user.model')
const UserInfo = require('../model/UserInfo')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs')
const validateEmail = require('../util/emailvalidator')
const logger = require('../config/config').logger

const BCRYPT_SALT_ROUNDS = 12;

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * On success, we pass further processing to the next express handler.
     * 
     * https://www.sitepoint.com/using-json-web-tokens-node-js/
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed to next for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {
        logger.debug('validateToken called')

        /**
         * A token can be sent in the body of a request, via a query parameter (in the URL),
         * or as an HTTP header. We choose the header variant.
         */
        const token = req.header('x-access-token') || ''

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                // Invalid token
                logger.error('auth.decode - ' + err.message || err)
                const error = new ApiError(err.message || err, 401)
                next(error)
            } else {
                // logger.trace('Authenticated! Payload = ')
                // logger.trace(payload)

                /**
                 * The payload contains the values that were put in it via the sub-field.
                 * We could use those in our application to trace actions that a user performs, 
                 * such as monitor CRUD operations, by storing the user ID in a logging database.
                 * Example: User 12345 performed an update operation on item xyz on date dd-mm-yyyy.
                 * To do so, we attach the payload.sub (or only a part of that) to the request object.
                 * In this way, every next express handler has access to it - and could do 
                 * something smart with it.  
                 */
                req.user = {
                    id: payload.sub.id
                }
                logger.debug('req.user = ', req.user)
                next()
            }
        })
    },

    /**
     * Log a user in by validating the email and password in the request.
     * Email is supposed to be more unique than a username, so we use that for identification.
     * When the email/password combination is valid a token is returned to the client. 
     * The token provides access to the protected endpoints in subsequent requests, as long 
     * as it is valid and not expired.
     * 
     * Security issue: the password is probably typed-in by the client and sent as 
     * plain text. Anyone listening on the network could read the password. The 
     * connection should therefore be secured and encrypted. Another option is to
     * encrypt the password on the client side and send it encrypted.
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res The token, additional user information, and status 200 when valid.
     * @param {*} next ApiError when token is invalid.
     */
    login(req, res, next) {

        logger.info('login')
        // Verify that we receive the expected input
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(validateEmail(req.body.email), 'email must be a valid email address.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        } catch (ex) {
            next(new ApiError(ex.toString(), 422))
            return
        }

        User.findOne({ email: req.body.email })
            .then(user => {
                if(!user) {
                    return next(new ApiError('user not found', 401))
                }
                logger.info('Found user: ' + user.name)
                bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
                    if (err) {
                        logger.info('Error matching passwords')
                        return next(new ApiError('Error matching passwords.', 500))
                    }
                    if (!passwordsMatch) {
                        logger.info('Password mismatch')
                        return next(new ApiError('You do not have access.', 400))
                    }
                    // Create an object containing the data we want in the payload.
                    const payload = {
                        email: user.email,
                        id: user._id
                    }
                    // Userinfo returned to the caller.
                    const userinfo = new UserInfo(user.name, user.email, auth.encodeToken(payload))
                    res.status(200).json(userinfo).end()
                })
            })
            .catch(error => {
                logger.info('In catch: error = ' + error)
                next(new ApiError(error, 401))
            })
    },

    /**
     * Register a new user. The user should provide a Voornaam, Achternaam, emailaddress and 
     * password. The emailaddress should be unique when it exists, an error must be thrown.
     * The password will be encrypted by the User class and must never be stored as plain text! 
     * 
     * @param {*} req The incoming request, containing valid properties.
     * @param {*} res The created user on success, or error on invalid properties.
     * @param {*} next ApiError when supplied properties are invalid.
     */
    register(req, res, next) {
        logger.info('register')
        try {
            assert(typeof (req.body.name) === 'object', 'A name object is missing.')
            assert(typeof (req.body.name.firstname) === 'string', 'name.firstname must be a string.')
            assert(typeof (req.body.name.lastname) === 'string', 'name.lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
            assert(validateEmail(req.body.email.trim()), 'email must be a valid emailaddress')
            assert(req.body.name.firstname.trim().length > 2, 'firstname must be at least 3 characters')
            assert(req.body.name.lastname.trim().length > 2, 'lastname must be at least 3 characters')
            assert(req.body.password.trim().length > 2, 'password must be at least 3 characters')
        } catch (ex) {
            next(new ApiError(ex.toString(), 422))
            return
        }

        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    logger.info('User already exists')
                    logger.info('Found user: ' + user.name)
                    return next(new ApiError('User exists', 400))
                }
                bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
                    .then(hashedPassword => {
                        req.body.password = hashedPassword
                        return User.create(req.body)
                    })
                    .then(user => {
                        logger.info('Created user: ' + user.name)
                        // Create an object containing the data we want in the payload.
                        const payload = {
                            email: user.email,
                            id: user._id
                        }
                        // Userinfo returned to the caller.
                        const userinfo = new UserInfo(user.name, user.email, auth.encodeToken(payload))
                        res.status(200).json(userinfo).end()

                    })
                    .catch(error => {
                        logger.info('Error creating user: ' + error)
                        next(new ApiError(error, 500))
                    })
            })
            .catch(error => {
                logger.info('In catch: error = ' + error)
                next(new ApiError(error, 500))
            })
    }

}
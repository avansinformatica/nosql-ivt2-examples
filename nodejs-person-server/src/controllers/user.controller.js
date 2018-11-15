//
// CRUD operations on person
//
'use strict';

const assert = require('assert')
const auth = require('../util/auth/authentication')
const User = require('../model/user.model')
const UserInfo = require('../model/UserInfo')
const ApiError = require('../model/ApiError')
const logger = require('../config/config').logger

module.exports = {

    /**
     * Create a new person and add it to the list.
     * 
     * @param {*} req The incoming request.
     * @param {*} res The newly created person.
     * @param {*} next ApiError when id is invalid.
     */
    createUser(req, res, next) {

        const userProps = req.body;
        logger.trace('user = ' + userProps);

        User.create(userProps)
            .then(user => res.status(200).json(user).end())
            .catch(error => next(new ApiError(error)))


        res.status(200).json('NOT IMPLEMENTED YET').end();
    },

    /**
     * Get the current list of persons.
     * 
     */
    getAllUsers(req, res, next) {
        logger.info('User info in getAllPersons: ' + req.user)

        User.find({}, 'name email')
            .then(users => res.status(200).json(users).end())
            .catch(error => next(new ApiError(error)))
    },

    /**
     * Replace an existing person in the list. We need an id and a new person 
     * object. The new person will be stored at index id.
     * 
     * @param {*} req req.params.id is the person's id in the personlist. req.body contains the new person object.
     * @param {*} res The updated person object.
     * @param {*} next ApiError when id and/or person object are invalid.
     */
    updateUserById(req, res, next) {
        const id = req.params.id
        const person = req.body
        res.status(200).json('NOT IMPLEMENTED YET').end();
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteUserById(req, res, next) {
        const id = req.params.id
        res.status(200).json('NOT IMPLEMENTED YET').end();
    },

    /**
     * Return the token, username, user email and user profile picture url. 
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {function} next 
     */
    getUserProfile(req, res, next) {

        logger.trace(`getUserProfile id = ${req.user.id}`)

        User.findById(req.user.id)
            .then(user => {
                logger.info('Found user: ' + user.name)

                // Create an object containing the data we want in the payload.
                // We generate a new token here.
                const payload = {
                    email: user.email,
                    id: req.user.id
                }
                // Userinfo returned to the caller.
                const userinfo = new UserInfo(user.name, user.email, auth.encodeToken(payload))
                res.status(200).json(userinfo).end()
            })
            .catch(error => {
                logger.info('In catch: error = ' + error)
                next(new ApiError(error, 500))
            })
    }

}
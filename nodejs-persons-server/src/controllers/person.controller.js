//
// CRUD operations
//
'use strict';

const ApiError = require('../model/ApiError')
const Person = require('../model/person.model')
const assert = require('assert')
const logger = require('../config/config').logger

module.exports = {

    create(req, res, next) {

        logger.debug('req.user = ', req.user)
        try {
            assert(req.user && req.user.id, 'User ID is missing!')
            assert(typeof (req.body) === 'object', 'request body must have an object containing naam and adres.')
            assert(typeof (req.body.naam) === 'string', 'naam must be a string.')
            assert(typeof (req.body.adres) === 'string', 'adres must be a string.')
            assert(typeof (req.body.lat) === 'string', 'lat must be a string.')
            assert(typeof (req.body.long) === 'string', 'long must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        next(new ApiError('Not implemented yet', 404))

    },

    /**
     * Haal alle items op voor de user met gegeven id. 
     * De user ID zit in het request na validatie! 
     */
    getAll(req, res, next) {

        const offset = parseInt(req.query.offset) || 0;
        const amount = parseInt(req.query.amount) || 10000;

        logger.debug(`offset = ${offset} amount = ${amount}`)

        Person
            .find()
            .skip(offset)
            .limit(amount)
            .sort()
            .then(persons => {
                res.status(200).json({ results: persons }).end()
            })
            .catch(error => next(new ApiError(error.errmsg || error, 500)))
       
    },

    /**
     * Haal alle items op voor de user met gegeven id. 
     * De user ID zit in het request na validatie! 
     */
    getById(req, res, next) {

        next(new ApiError('Not implemented yet', 404))

    },

    /**
     * Replace an existing object in the database.
     */
    update(req, res, next) {

        // req moet de juiste attributen hebben - het nieuwe studentenhuis
        try {
            assert(req.user && req.user.id, 'User ID is missing!')
            assert(typeof (req.body) === 'object', 'request body must have an object containing naam and adres.')
            assert(typeof (req.body.naam) === 'string', 'naam must be a string.')
            assert(typeof (req.body.adres) === 'string', 'adres must be a string.')
            assert(typeof (req.body.lat) === 'string', 'lat must be a string.')
            assert(typeof (req.body.long) === 'string', 'long must be a string.')
        } catch (ex) {
            const error = new ApiError(ex.toString(), 500)
            next(error)
            return
        }

        next(new ApiError('Not implemented yet', 404))

    },

    delete(req, res, next) {
        next(new ApiError('Not implemented yet', 404))
    }

}
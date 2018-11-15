//
// User routes
//
'use strict';

let routes = require('express').Router()
let UserController = require('../controllers/user.controller')

/**
 * @typedef ApiError
 * @property {string} message.required
 * @property {integer} code.required
 * @property {string} datetime.required
 */

/**
 * @typedef ValidToken
 * @property {string} token.required
 * @property {string} email.required
 */

routes.get('/users', UserController.getAllUsers)

/**
 * Beschrijving volgt nog.
 *
 * @route GET /api/user/me
 * @group Users - Endpoints voor user informatie.
 * @returns {ValidToken.model} 200.OK - Token informatie
 * @returns {ApiError.model} 401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model} 412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.get('/users/me', UserController.getUserProfile)

/**
 * Beschrijving volgt nog.
 *
 * @route PUT /api/user/me
 * @group Users - Endpoints voor user informatie.
 * @returns {ValidToken.model} 200.OK - Token informatie
 * @returns {ApiError.model} 401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model} 412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.put('/users/me', UserController.updateUserById)

/**
 * Beschrijving volgt nog.
 *
 * @route DELETE /api/user/me
 * @group Users - Endpoints voor user informatie.
 * @returns {ValidToken.model} 200.OK - Token informatie
 * @returns {ApiError.model} 401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model} 412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.delete('/users/me', UserController.deleteUserById)

module.exports = routes
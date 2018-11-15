//
// routes.js
//
'use strict';

let routes = require('express').Router()
const PersonController = require('../controllers/person.controller')

/**
 * @typedef ApiError
 * @property {string} message.required - De tekst van de foutmelding.
 * @property {number} code.required - HTTP error code
 * @property {string} datetime.required - De datum en tijd in ISO notatie.
 */

/**
 * @typedef Person * @property {string} naam.required - De naam van het persons
 * @property {string} adres.required - Straatnaam en huisnummer van het persons
 * @property {string} lat.required - Latitude Geo coördinaten van het persons
 * @property {string} long.required - Longitude Geo coördinaten van het persons
 * @property {string} image - Optionele afbeelding van het persons
 */

/**
 * @typedef PersonResponse
 * @property {number} ID.required - De ID van het persons
 * @property {string} naam.required - De naam van het persons
 * @property {string} adres.required - Straatnaam en huisnummer van het persons
 * @property {string} contact.required - De voor en achternaam van de gebruiker die het persons heeft aangemaakt.
 * @property {string} email.required - Email van de gebruiker die het persons heeft aangemaakt.
 * @property {string} lat.required - Latitude Geo coördinaten van het persons
 * @property {string} long.required - Longitude Geo coördinaten van het persons
 * @property {string} image - Afbeelding van het persons
 */

/**
 * Beschrijving volgt nog.
 *
 * @route GET /api/persons
 * @group Persons - Endpoints voor CRUD functionaliteit op een person.
 * @returns {personResponse.model} 200 - Een array met studentenhuizen.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 */
routes.get('/persons', PersonController.getAll)

/**
 * Beschrijving volgt nog.
 *  
 * @route GET /api/persons/{id}
 * @group Persons - Endpoints voor CRUD functionaliteit op een person.
 * @returns {personResponse.model} 200 - Het person met de gegeven huisId.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  404 - Niet gevonden (huisId bestaat niet)
 */
routes.get('/persons/:id', PersonController.getById)


module.exports = routes
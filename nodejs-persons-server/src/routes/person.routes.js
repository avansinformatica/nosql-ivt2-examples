//
// routes.js
//
'use strict';

let routes = require('express').Router()
const PersonController = require('../controllers/person.controller')
const UploadController = require('../controllers/upload.controller')

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
 * @route POST /api/persons
 * @group Persons - Endpoints voor CRUD functionaliteit op een persons.
 * @param {persons.model} persons.body.required - Een object in de request body met de gegevens van het persons.
 * @returns {personsResponse.model} 200 - Het toegevoegde persons met ID en gebruikersinfo
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.post('/persons', PersonController.create)

/**
 * Beschrijving volgt nog.
 *
 * @route PUT /api/persons/{id}
 * @group Persons - Endpoints voor CRUD functionaliteit op een persons.
 * @param {persons.model} persons.body.required - De nieuwe informatie over het persons
 * @returns {personsResponse.model} 200 - Het gewijzigde (nieuwe) persons
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  404 - Niet gevonden (id bestaat niet)
 * @returns {ApiError.model}  409 - Conflict (Gebruiker mag deze data niet wijzigen)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.put('/persons/:id', PersonController.update)

/**
 * Beschrijving volgt nog.
 *
 * @route DELETE /api/persons/{id}
 * @group Persons - Endpoints voor CRUD functionaliteit op een persons.
 * @returns {object} 200 - Info dat de verwijdering is gelukt.
 * @returns {ApiError.model}  401 - Niet geautoriseerd (geen valid token)
 * @returns {ApiError.model}  409 - Conflict (Gebruiker mag deze data niet verwijderen)
 * @returns {ApiError.model}  404 - Niet gevonden (id bestaat niet)
 * @returns {ApiError.model}  412 - Een of meer properties in de request body ontbreken of zijn foutief 
 */
routes.delete('/persons/:id', PersonController.delete)

module.exports = routes
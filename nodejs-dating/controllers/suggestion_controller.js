const neoQueries = require('../models/neo_queries');
const neo = require('../neo4j_setup');


// get suggestions for a user
function getSuggestions(req, res) {
    const name = req.params.id;
    let session = neo.session();

    neoQueries.retrieveSuggestions(session, name)
        .then(result => {
            session.close();
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.send(err);
        });
}


module.exports = {
    getSuggestions, getSuggestions,
}
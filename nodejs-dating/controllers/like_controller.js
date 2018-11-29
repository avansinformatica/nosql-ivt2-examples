const neoQueries = require('../models/neo_queries');
const neo = require('../neo4j_setup');


// get likes of a user
function getLikes(req, res) {
    const name = req.params.id;
    let session = neo.session();

    neoQueries.retrieveLikes(session, name)
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

// add a new like from a user to another
function addLike(req, res) {
    const name = req.params.id;
    const other = req.params.other;
    let session = neo.session();

    neoQueries.addLike(session, name, other)
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

// remove a like from a user to another
function removeLike(req, res) {
    // TODO implement
}


module.exports = {
    getLikes: getLikes,
    addLike: addLike,
    removeLike: removeLike,
}
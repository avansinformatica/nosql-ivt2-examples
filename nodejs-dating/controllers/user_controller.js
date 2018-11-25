const User = require('../models/user');
const neo = require('../neo4j_setup');
const neoQueries = require('../models/neo_queries');

// list all users
function list(_, res) {
    User.find()
        .then(users => {
            let reply = {
                "users": users
            }
            res.send(reply);
        })
        .catch(err => {
            console.log(err);
            res.status(400);
            res.send(err);
        });
}

// create a new user
function create(req, res) {
    const userProps = req.body;
    let session;
    let replyUser;

    // add user to mongodb
    User.create(userProps)
        .then(user => {
            replyUser = user;
            // add user with relevant nodes to neo4j

            // NOTE: we have an atomicity problem here
            session = neo.session();
            return neoQueries.createUser(session, user);
        })
        .then(() => {
            session.close();
            res.send(replyUser);
        })
        .catch(err => {
            // error code 11000 in mongo signals duplicate entry
            if (err.code === 11000) {
                res.status(409);
                res.send('user already exists');
            } else {
                console.log('error in create user: ' + err);
                res.status(400);
                res.send(err);
            }
        });
}

// get a specific user
function getUser(req, res) {
    const name = req.params.id;
    User.findOne({name: name})
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.log('error in get user: ' + err);
            res.status(400);
            res.send(err);
        })
}

// update a specific user
function setUser(req, res) {
    const name = req.params.id;
    const props = req.body;
    User.updateOne({name: name}, props)
        // TODO also update graph!
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.log('error in set user: ' + err);
            res.status(400);
            res.send(err);
        });
}

module.exports = {
    list: list,
    create: create,
    getUser: getUser,
    setUser: setUser
}
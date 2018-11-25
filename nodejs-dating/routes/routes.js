const UsersController = require('../controllers/user_controller.js');
const MatchController = require('../controllers/match_controller.js');
const LikeController = require('../controllers/like_controller.js');
const SuggestionController = require('../controllers/suggestion_controller.js');

function replyBasic(req, res) {
    let user = {
        'name': 'user',
        'description': 'This JSON defines the parameters of a user',
        'properties': {
            'name': {
                'title': 'name',
                'description': 'Full user name',
                'type': 'string',
                'required': true,
                'unique': true,
            },
            'email': {
                'title': 'email',
                'description': 'Email address of the user',
                'type': 'email',
                'required': true,
            }
        }
    }

    let reply = {
        'description': 'Avans dating app',
        'entities': [
            user
        ]
    };

    res.send(reply);
}

module.exports = (app) => {
    // basic entry route
    app.get('/', replyBasic);

    // get list of users
    app.get('/users', UsersController.list);

    // create new user
    app.post('/users', UsersController.create);

    // get a specific user
    app.get('/users/:id', UsersController.getUser);

    // update a specific user
    app.put('/users/:id', UsersController.setUser);

    // get matches of a user
    app.get('/matches/:id', MatchController.getMatches);

    // get likes of a user
    app.get('/likes/:id', LikeController.getLikes);

    // add a new like
    app.post('/likes/:id/:other', LikeController.addLike);

    // remove a like
    app.delete('/likes/:id/:other', LikeController.removeLike);

    // get suggestions for a user
    app.get('/suggestions/:id', SuggestionController.getSuggestions);
};
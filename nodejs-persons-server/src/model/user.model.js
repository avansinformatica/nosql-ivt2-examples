const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {
        type: String,
        unique: true,
        validate: {
            validator: (email) => email.length > 2,
            message: 'Email must be valid.'
        },
        required: [true, 'Email is required.']
    },

    name: {
        firstname: {
            type: String,
            validate: {
                validator: (firstname) => firstname.length > 2,
                message: 'firstname must be valid.'
            },
            required: [true, 'firstname is required.']
        },
        lastname: {
            type: String,
            validate: {
                validator: (lastname) => lastname.length > 2,
                message: 'lastname must be valid.'
            },
            required: [true, 'lastname is required.']
        },
    },

    password: {
        type: String,
        validate: {
            validator: (password) => password.length > 2,
            message: 'password must be valid.'
        },
        required: [true, 'password is required.']
    }
}, {
    timestamps: true
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
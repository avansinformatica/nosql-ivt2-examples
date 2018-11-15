const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    bought: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});

// create the user model
const User = mongoose.model('user', UserSchema);

// export the user model
module.exports = User;
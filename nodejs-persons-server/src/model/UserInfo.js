//
// Class structuring information about a user.
//
'use strict';

class UserInfo {

    constructor(name, email, token) {
        this.name = name;
        this.email = email;
        this.token = token;        
    }

}

module.exports = UserInfo;
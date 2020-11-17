// in this file we simulate a database call that takes
// a random amount of time

data = [{
    name: 'Alexander',
    favoriteColor: 'blue',
    favoriteNumber: 3,
    numberOfCats: 1,
    friendsWith: 'Jan',
}, {
    name: 'Jan',
    favoriteColor: 'red',
    favoriteNumber: 5,
    numberOfPets: 3,
    friendsWith: 'Dion'
}, {
    name: 'Dion',
    favoriteColor: 'yellow',
    favoriteNumber: 7,
    numberOfPaintings: 53,
}]

function findUser(userName) {
    return data.filter(user => user.name === userName)[0]
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function randomTime() {
    return Math.floor(Math.random() * 1000 + 2000)
}

function findUserSync(userName) {
    sleepFor(randomTime())

    return findUser(userName)
}

function findRiskyUserSync(userName) {
    if (Math.random() < .5) {
        return findUser(userName)
    } else {
        throw new Error('connection lost :(')
    }
}

function findUserCallback(userName, cb) {
    setTimeout(() => {
        cb(findUser(userName))
    }, randomTime());
}

function findRiskyUserCallback(userName, cb) {
    setTimeout(() => {
        if (Math.random() < .5) {
            cb(findUser(userName), undefined)
        } else {
            cb(undefined, new Error('connection lost :('))
        }
    }, randomTime());
}

function findUserAsync(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(findUser(userName))
        }, randomTime())
    })
}

function findRiskyUserAsync(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < .5) {
                resolve(findUser(userName))
            } else {
                reject(new Error('connection lost :('))
            }
        }, randomTime())
    })
}

module.exports = {
    findUserSync,
    findRiskyUserSync,
    findUserCallback,
    findRiskyUserCallback,
    findUserAsync,
    findRiskyUserAsync,
}
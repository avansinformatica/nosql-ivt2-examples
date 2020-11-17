const db = require('./db')

// synchronous with errors
try {
    console.log(db.findRiskyUserSync('Alexander').numberOfCats)
} catch (err) {
    console.log(`${err.name}: ${err.message}`)
}

// callbacks with errors
db.findRiskyUserCallback('Alexander', (user, err) => {
    if (err) {
        console.log(`${err.name}: ${err.message}`)
    } else {
        console.log(user.numberOfCats)
    }
})

// promises with errors
db.findUserAsync('Alexander')
    .then(user => {
        console.log(user.numberOfCats)
    })
    .catch(err => {
        console.log(`${err.name}: ${err.message}`)
    })

// async-await with errors
async function runWithErrors() {
    try {
        const user = await db.findRiskyUserAsync('Alexander')
        console.log(user.numberOfCats)
    } catch (err) {
        console.log(`${err.name}: ${err.message}`)
    }
}

runWithErrors()
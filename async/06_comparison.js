const db = require('./db')

// run this function and you're going to have a bad time...
function serialWaiting() {
    for (let i = 0; i < 100; i++) {
        console.log(db.findUserSync('Alexander'))
    }
}

// run this function to fetch all the Alexanders!
async function parallelWaiting() {
    const promises = []

    for (let i = 0; i < 100; i++) {
        promises.push(db.findUserAsync('Alexander'))
    }

    // this returns a promise that resolves when all promises
    // in the array have resolved
    const results = await Promise.all(promises)
    
    console.log(results)
}

// serialWaiting()
parallelWaiting()
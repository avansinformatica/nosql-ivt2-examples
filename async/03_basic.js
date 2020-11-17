// this just demonstrates a basic Promise in js

const myPromise = new Promise((resolve, reject) => {
    // a promise can either resolve with a result, or reject
    // with an error
    resolve(['some', 'results', 'in', 'an', 'array'])
})

const myFaultyPromise = new Promise((resolve, reject) => {
    reject(new Error('y no work'))
})


myPromise
    .then(results => {
        console.log(results.join(' '))

        // teaser for functional programming:
        console.log(results.reduce((a, b) => a + ' ' + b))
    })

myFaultyPromise
    .then(results => {
        console.log('you will never see these results :(')
        console.log(results)
    })
    .catch(error => {
        console.error(`${error.name}: ${error.message}`)
    })
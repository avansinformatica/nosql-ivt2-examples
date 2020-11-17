const db = require('./db')

console.log('fetching Alexander')
db.findUserAsync('Alexander')
    .then(user => {
        console.log(`done! found ${user.friendsWith}`)
        console.log(`fetching ${user.friendsWith}`)
        return db.findUserAsync(user.friendsWith)
    })
    .then(firstFriend => {
        console.log(`done! found ${firstFriend.friendsWith}`)
        console.log(`fetching ${firstFriend.friendsWith}`)
        return db.findUserAsync(firstFriend.friendsWith)
    })
    // no more nasty indentation :D
    // this is called a PROMISE CHAIN, because we chain
    // promises together by returning them from the previous
    // function and using their resolved value in the next
    .then(secondFriend => {
        console.log('done! we found the two-deep friend!')
        console.log(secondFriend)
    })

console.log(`and in the meantime we can STILL compute 1 + 1 = ${1+1}`)



// NEVER EVER DO THIS!!!!!!!!!!!!111!!!!1
db.findUserAsync('Alexander')
    .then(user => {
        db.findUserAsync(user.friendsWith)
            .then(firstFriend => {
                db.findUserAsync(firstFriend.friendsWith)
                    .then(secondFriend => {
                        // the nasty indentation is BACK!
                        console.log(secondFriend)
                    })
            })
    })



// you don't have to make it a promise to use it in the 
// following 'then', how convenient!
db.findUserAsync('Alexander')
    .then(user => {
        return user.numberOfCats
    })
    .then(catNumber => {
        console.log(`Alexander has ${catNumber} cats`)
    })
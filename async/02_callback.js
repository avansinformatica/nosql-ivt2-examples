const db = require('./db')

// asynchronous callbacks solve the problem of waiting for a response,
// because we can do other work in the meantime!
console.log('fetching Alexander')

db.findUserCallback('Alexander', user => {

    console.log(`done! found: ${user.friendsWith}`)
    console.log(`fetching ${user.friendsWith}`)

    db.findUserCallback(user.friendsWith, firstFriend => {

        console.log(`done! found: ${firstFriend.friendsWith}`)
        
        db.findUserCallback(firstFriend.friendsWith, secondFriend => {
            
            // but this indentation is just NASTY :(
            console.log('done! we found the two-deep friend!')
            console.log(secondFriend)
        })
    })
})

console.log(`and in the meantime we COULD compute 1 + 1 = ${1+1}`)
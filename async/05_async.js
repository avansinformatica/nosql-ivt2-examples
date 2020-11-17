const db = require('./db')

// unfortunately you can't use 'await' directly in the main code
// in older node versions...
// you have to pack it up in an async function
// in the newest version of node (and browsers!) you CAN do that
async function runTest() {
    console.log('fetching Alexander')
    
    // no more indentation AND no more clunky .then()!
    // but still exactly the same asynchronous behavior!
    const user = await db.findUserAsync('Alexander')

    console.log(`done! found ${user.friendsWith}`)
    console.log(`fetching ${user.friendsWith}`)

    const firstFriend = await db.findUserAsync(user.friendsWith)

    console.log(`done! found ${firstFriend.friendsWith}`)
    console.log(`fetching ${firstFriend.friendsWith}`)

    const secondFriend = await db.findUserAsync(firstFriend.friendsWith)

    console.log('done! we found the two-deep friend!')
    console.log(secondFriend)
}

runTest()

console.log(`and in the meantime we can STILL compute 1 + 1 = ${1+1}`)


// Oh, and please please please DON'T do this
// just pick a side and stick with it!
async function runTest() {
    const user = await db.findUserAsync('Alexander')

    // ugh...
    db.findUserAsync(user.friendsWith)
        .then(firstFriend => {
        
            // ugh...
            const secondFriend = await db.findUserAsync(firstFriend.friendsWith)

            console.log(secondFriend)
        })

}
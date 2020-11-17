// WARNING: this is a really BAD idea!
// just for illustration purposes

const db = require('./db')

// get a user from our mocked database
console.log('fetching Alexander')
const alexander = db.findUserSync('Alexander')

// now we wait... (can't do anything else)

console.log(`done! found ${alexander.friendsWith}!`)

console.log(`fetching ${alexander.friendsWith}`)
const firstFriend = db.findUserSync(alexander.friendsWith)

// now we wait... (can't do anything else)

console.log(`done! found ${firstFriend.friendsWith}`)

console.log(`fetching ${firstFriend.friendsWith}`)
const secondFriend = db.findUserSync(firstFriend.friendsWith)

// now we wait... (can't do anything else)

console.log('done! we found the two-deep friend!')

console.log(secondFriend)

console.log(`and in the meantime we could not compute 1 + 1 = ${1+1}!`)
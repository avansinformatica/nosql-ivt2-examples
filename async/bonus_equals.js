// some funny aspects of javascript equals operators

// there are two equals operators in js: '==' and '==='

// '===' is probably the one you're most familiar with,
// it will only return true if the objects on both sides
// are of the same type and have the same value
const four = 4
const five = 5

// all true:
console.log(`'a' === 'a': ${'a' === 'a'}`)
console.log(`1 === 1: ${1 === 1}`)
console.log(`1 !== 2: ${1 !== 2}`)
console.log(`four === four: ${four === four}`)
console.log(`four === 4: ${four === 4}`)

// all false:
console.log(`1 === '1': ${1 === '1'}`)
console.log(`1 === 2: ${1 === 2}`)
console.log(`four === five: ${four === five}`)

// however! note that it compares if objects are at the same
// place in memory, not if they have the same contents!
const objA = {name: 'name'}
const objB = {name: 'name'}
const objC = objA

console.log(`objA === objA: ${objA === objA}`)
console.log(`objA === objB: ${objA === objB}`)
console.log(`objA === objC: ${objA === objC}`)

// '==' will try to convert the objects on both sides 
// to matching types to determine whether they are equal

// so it for example converts numbers and strings!
console.log(`1 == '1': ${1 == '1'}`)
console.log(`1.1 == '1.1': ${1.1 == '1.1'}`)

// objects are still compared the same however
console.log(`objA == objA: ${objA == objA}`)
console.log(`objA == objB: ${objA == objB}`)
console.log(`objA == objC: ${objA == objC}`)

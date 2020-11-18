it('succeeds a test', () => {
    // yaay
})

it('fails a test', () => {
    throw new Error('booo (write something useful here, it shows up in the test report!')
})

it('runs asynchronous tests with done', (done) => {
    setTimeout(() => {
        done()
    }, 500);
})

// this function is used in the demonstration below
async function someAsyncOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 500);
    })
}

it('runs async tests BETTER with async', async () => {
    await someAsyncOperation()
})

// run this before each test (even though it's declared here)
beforeEach(() => {
    console.log('beforeEach: runs again before each test')
})

before(() => {
    console.log('beforeAll: runs once before all tests')
})

afterEach(() => {
    console.log('afterEach: runs again after each test')
})

after(() => {
    console.log('afterAll: runs once after all tests')
})

describe('grouping some tests together', () => {
    beforeEach(() => {
        console.log('only before each of the grouped tests')
    })

    it('first in the group', () => {})

    it('second in the group', () => {})
})

xit('this test is disabled and pending', () => {
    // not yet finished
})

it('this test is also pending') // because no function is passed as argument

it.only('run just a single test', () => {
    console.log('useful when working on this test')
})

it.only('another to work on', () => {
    console.log('or when working on several at the same time')
})

describe.only('only run group of tests', () => {
    beforeEach(() => {
        console.log('only before each of the grouped tests')
    })

    it('first only in the group', () => {})

    it('second only in the group', () => {})
})
// here is an example of how to use tests

var assert = require('assert');

// describe what we're testing
describe('Testing framework', () => {

    // an individual test is defined like this
    // note that it's english grammar!
    it('can run this test', (done) => {
        // run an asynchronous test, like a call to mongo
        setTimeout(() => {
            // use assert to write tests
            assert(true);
            // call done when the next test can be run
            done();
        }, 0);
    })
})
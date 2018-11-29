let neo = {
    driver: undefined,
    session() {
        return this.driver.session();
    }
};

module.exports = neo;
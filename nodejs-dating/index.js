const app = require('./app');

// port can be set by heroku
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
var indexRoute = require("./home");
var configurationRoute = require("./configuration");

module.exports = function(app) {
    app.get('/', indexRoute.index);
    app.get('/configuration.js', configurationRoute.index);
};

var indexRoute = require("./home");
var configurationRoute = require("./configuration");
var templatesRoute = require("./templates");

module.exports = function(app) {
  app.get('/', indexRoute.index);
  app.get('/configuration.js', configurationRoute.index);
  app.get(/\/templates\/(.*)/, templatesRoute.serve);
}
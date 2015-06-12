var jwt = require("express-jwt");
var jwtUtilities = require("./jwt_utilities");
var indexRoute = require("./home");
var templatesRoute = require("./templates");
var downloadRoute = require("./download");

module.exports = function (app) {
  app.get("/", indexRoute.index);
  app.get(/^\/_ah\/(start|health|stop)$/, function (request, response) {
    response.set("Content-Type", "text/plain");
    response.send("OK");
    if (request.params[0] === "stop") {
      process.exit();
    }
  });
  app.get(/^\/templates\/(.*)$/, templatesRoute.serve);
  app.get("/bot/:botId/pack/:packId/download", jwt(jwtUtilities.config), downloadRoute.download);
  app.get("*", function (request, response) {
    response.redirect("/#/404");
  });
};

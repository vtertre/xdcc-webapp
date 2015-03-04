var indexRoute = require("./home");
var templatesRoute = require("./templates");
var downloadRoute = require("./download");

module.exports = function (app) {
  app.get("/", indexRoute.index);
  app.get(/\/templates\/(.*)/, templatesRoute.serve);
  app.get("/bot/:botId/pack/:packId/download", downloadRoute.download);
};

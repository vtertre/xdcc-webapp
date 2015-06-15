"use strict";

var express = require("express"),
  path = require("path"),
  i18n = require("i18next"),
  http = require("http");
var morgan = require("morgan");
var serveStatic = require("serve-static");
var revision = require("./revision");

var app = express();

console.log("Configuring login application for environment: " + app.get("env"));

i18n.init({
  ignoreRoutes: ['public/'],
  fallbackLng: 'en',
  detectLngFromHeaders: true
});

if ("development" === app.get("env")) {
  app.use(morgan("combined"));
}

if ("staging" === app.get("env")) {
  revision.initMap(require("./public/genere/map.json"));
}

if ("production" === app.get("env")) {
  revision.initMap(require("./public/genere/map.json"));
}

i18n.serveClientScript(app)
  .serveDynamicResources(app);

app.use(i18n.handle);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "jade");
app.use(serveStatic(__dirname + "/public/"));

require("./routes")(app);

revision.registerHelper(app);
i18n.registerAppHelper(app);

module.exports = {
  app: app
};
"use strict";

var express = require("express"),
  path = require("path"),
  i18n = require("i18next"),
  http = require("http");
var morgan = require("morgan");
var serveStatic = require("serve-static");
var revision = require("./revision");
var proxy = require('express-http-proxy');

var app = express();
var server = http.createServer(app);
var io = require("socket.io").listen(server);

console.log("Configuring application for environment: " + app.get("env"));

i18n.init({
  ignoreRoutes: ['public/'],
  fallbackLng: 'en',
  detectLngFromHeaders: true
});

if ("development" === app.get("env")) {
  app.locals.apiUrl = "http://localhost:8089";
  process.env.JWT_SECRET = "devsecret";
  app.use(morgan("combined"));
}

if ("staging" === app.get("env")) {
  revision.initMap(require("./public/genere/map.json"));
  app.locals.apiUrl = process.env.API_URL;
}

if ("production" === app.get("env")) {
  revision.initMap(require("./public/genere/map.json"));
  app.locals.apiUrl = process.env.API_URL;
}

app.use('/api', proxy(app.locals.apiUrl, {
  forwardPath: function (req, res) {
    return require('url').parse(req.url).path;
  }
}));

i18n.serveClientScript(app)
  .serveDynamicResources(app);

app.use(i18n.handle);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "jade");
app.use(serveStatic(__dirname + "/public/"));

require("./routes")(app);

revision.registerHelper(app);
i18n.registerAppHelper(app);

var port = process.env.PORT || 5000;
server.listen(port, function () {
  console.log("Express server listening on port " + port);
});

require("./lib/connect")(io);
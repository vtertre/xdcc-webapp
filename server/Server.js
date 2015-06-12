"use strict";

var express = require("express");
var path = require("path");
var configuration = require("./utils/environment_configuration");
var i18n = require("i18next");
var http = require("http");
var serveStatic = require("serve-static");
var socketIo = require("socket.io");
var morgan = require("morgan");
var ProxyHelper = require("./proxy/proxy_helper");
var Router = require("./router");
var revision = require("../revision");
var configureSockets = require("../lib/connect");

function Server() {
  var app = express();
  var server = http.createServer(app);

  console.log("Configuring xdcc application for environment: " + app.get("env"));

  if ("development" === app.get("env")) {
    app.use(morgan("combined"));
  }

  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "jade");
  app.use(serveStatic(path.join(__dirname, "../public/")));
  app.use("/login", require(configuration.loginAppPath).app);

  revision.initMap(require(configuration.revisionMapPath));
  revision.registerHelper(app);

  configureTranslation();

  new ProxyHelper().configure(app);
  new Router().configure(app);

  app.use(function (error, request, response, next) {
    if (error && error.status === 401) {
      response.redirect(401, "/login");
    }
  });

  var io = socketIo(server);
  configureSockets(io);

  this.start = function () {
    server.listen(port(), function () {
      console.log("Express server listening on port " + this.address().port);
    });
  };

  function port() {
    return configuration.serverPort;
  }

  function configureTranslation() {
    i18n.init({
      ignoreRoutes: ["public/"],
      fallbackLng: "en",
      detectLngFromHeaders: true
    });

    app.use(i18n.handle);
    i18n.serveClientScript(app)
      .serveDynamicResources(app)
      .registerAppHelper(app);
  }
}

module.exports = Server;
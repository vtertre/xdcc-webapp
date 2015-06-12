"use strict";

var configureRoutes = require("../routes");

function Router() {
  this.configure = function (app) {
    configureRoutes(app);
  }
}

module.exports = Router;
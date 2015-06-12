"use strict";

var httpProxy = require("express-http-proxy");
var configuration = require("../utils/environment_configuration");
var url = require("url");

function ProxyHelper() {
  this.configure = function (app) {
    app.use("/api", httpProxy(configuration.apiUrl, {
      forwardPath: function (req, res) {
        return url.parse(req.url).path;
      }
    }));

    app.use("/sessions", httpProxy(configuration.sessionsUrl, {
      forwardPath: function (req, res) {
        return url.parse(req.url).path;
      }
    }));

    app.use("/sub-api", httpProxy(configuration.subtitlesUrl, {
      forwardPath: function (req, res) {
        return "/subtitles" + url.parse(req.url).path;
      }
    }));
  };
}

module.exports = ProxyHelper;
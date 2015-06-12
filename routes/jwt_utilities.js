"use strict";

var configuration = require("../server/utils/environment_configuration");

module.exports = {
  config: {
    secret: configuration.jwtSecret,
    audience: "xdcc:app",
    issuer: "xdcc:sessions",
    getToken: getTokenFromQueryString
  }
};

function getTokenFromQueryString(req) {
  var query = req.query;
  if (!query) {
    return null;
  }

  return query.t;
}
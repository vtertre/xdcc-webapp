"use strict";
module.exports = require("angular").module("authentication", [require("angular-locker")])
  .service("AuthenticationService", require("./service/authentication_service")).name;

module.exports = require("angular").module("authentication")
  .service("Session", require("./service/session_service")).name;

module.exports = require("angular").module("authentication")
  .factory("AuthInterceptor", require("./service/auth_interceptor_factory")).name;
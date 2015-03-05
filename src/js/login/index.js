"use strict";
module.exports = require("angular").module("login", [])
  .controller("LoginController", require("./controller/login_controller")).name;

module.exports = require("angular").module("login")
  .service("LoginService", require("./service/login_service")).name;

module.exports = require("angular").module("login")
  .factory("AuthInterceptor", require("./service/auth_interceptor_factory")).name;
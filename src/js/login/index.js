"use strict";
module.exports = require("angular").module("login", [])
  .controller("LoginController", require("./controller/login_controller")).name;
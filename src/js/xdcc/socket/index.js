"use strict";
module.exports = require("angular").module("socket", [require("angular-socket-io")])
  .factory("socket", require("./service/socket_factory")).name;
"use strict";

var angular = require("angular");

var socketModule = angular.module("socket", [require("angular-socket-io")]);

socketModule
  .factory("socket", require("./service/socket_factory"));

module.exports = socketModule.name;
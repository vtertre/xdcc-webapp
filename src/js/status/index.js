"use strict";

var angular = require("angular");

var stateModule = angular.module("status", [require("../socket/index")]);

stateModule
  .service("ClientStatusService", require("./service/client_status_service"))
  .directive("xdccClientStatus", require("./directive/client_status_directive"));

module.exports = stateModule.name;
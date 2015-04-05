"use strict";

var angular = require("angular");

var commonModule = angular.module("common", [require("../socket")]);

commonModule
  .controller("OrchestratorController", require("./controller/orchestrator_controller"))
  .controller("ConnectedUserController", require("./controller/connected_user_controller"))
  .controller("MenuLocationController", require("./controller/menu_location_controller"));

module.exports = commonModule.name;
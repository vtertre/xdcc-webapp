"use strict";
module.exports = require("angular").module("common", [require("../socket")])
  .controller("OrchestratorController", require("./controller/orchestrator_controller"))
  .controller("ConnectedUserController", require("./controller/connected_user_controller"))
  .controller("MenuLocationController", require("./controller/menu_location_controller"))
  .name;
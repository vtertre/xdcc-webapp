"use strict";

var angular = require("angular");

module.exports = ClientStatusService;

function ClientStatusService() {}

angular.extend(ClientStatusService.prototype, {
  currentStatus: "connecting"
});
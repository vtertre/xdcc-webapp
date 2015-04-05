"use strict";

var angular = require("angular");

var queueModule = angular.module("queue", [require("../socket")]);

queueModule
  .controller("QueueController", require("./controller/queue_controller"))
  .controller("QueueActionController", require("./controller/queue_action_controller"));

queueModule
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/queue", {
        controller: "QueueActionController",
        templateUrl: "/templates/queue/index"
      });
  }]);

module.exports = queueModule.name;
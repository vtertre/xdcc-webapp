"use strict";

var angular = require("angular");

var queueModule = angular.module("queue", [require("../socket")]);

queueModule
  .service("QueueService", require("./service/queue_service"))
  .controller("QueueController", require("./controller/queue_controller"))
  .controller("QueueActionController", require("./controller/queue_action_controller"));

queueModule
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/queue", {
        controller: "QueueActionController",
        controllerAs: "model",
        templateUrl: "/templates/queue/index"
      });
  }]);

module.exports = queueModule.name;
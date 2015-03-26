"use strict";
module.exports = require("angular").module("queue", [require("../socket")])
  .controller("QueueController", require("./controller/queue_controller"))
  .controller("QueueActionController", require("./controller/queue_action_controller"))

  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/queue", {
        controller: "QueueActionController",
        templateUrl: "/templates/queue/index"
      });
  }])
  .name;
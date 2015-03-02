"use strict";
var angular = require("angular");

angular.module("xdcc", [require("angular-route"), require("./bot")])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/xdcc/templates/index"
      })
      .when("/bot", {
        controller: "BotListController",
        templateUrl: "/xdcc/templates/bot/index"
      })
      .when("/bot/:id", {
        controller: "BotController",
        templateUrl: "/xdcc/templates/bot/show"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);
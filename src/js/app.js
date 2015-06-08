"use strict";
var angular = require("angular");

angular.module("xdcc", [
  require("angular-route"),
  require("angular-loading-bar"),
  require("angular-bootstrap"),
  require("./common"),
  require("./bot"),
  require("./authentication"),
  require("./queue"),
  require("./search"),
  require("./subtitle"),
  require("./status")
])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/templates/index"
      })
      .otherwise({
        redirectTo: "/"
      });
  }])

  .constant("ORDER_OPTIONS", {
    ascending: false,
    descending: true
  });
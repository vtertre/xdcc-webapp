"use strict";
var angular = require("angular");

angular.module("xdcc", [
  require("angular-bootstrap"),
  require("angular-route"),
  require("./common"),
  require("./bot"),
  require("./authentication"),
  require("./queue")
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
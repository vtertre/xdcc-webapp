"use strict";
var angular = require("angular");

angular.module("login", [require("angular-route"), require("./tmp")])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/login"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);
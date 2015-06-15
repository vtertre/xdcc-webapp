"use strict";

var angular = require("angular");

module.exports = function () {
  angular.module("error")
    .config(["$routeProvider", configure]);

  function configure($routeProvider) {
    $routeProvider
      .when("/404", {
        templateUrl: "/templates/error/404"
      })
      .when("/error", {
        templateUrl: "/templates/error/default"
      });
  }
};
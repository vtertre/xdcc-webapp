"use strict";

var angular = require("angular");
var configureModuleRouting = require("./router");

var errorModule = angular.module("error", []);

errorModule
  .factory("Error404InterceptorService", require("./service/error_404_interceptor_service"));

errorModule
  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("Error404InterceptorService");
  }]);

configureModuleRouting();

module.exports = errorModule.name;
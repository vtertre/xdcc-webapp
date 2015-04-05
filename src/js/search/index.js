"use strict";

var angular = require("angular");

var searchModule = angular.module("search", []);

searchModule
  .controller("SearchController", require("./controller/search_controller"))
  .factory("Search", require("./resource/search_resource"));

module.exports = searchModule.name;
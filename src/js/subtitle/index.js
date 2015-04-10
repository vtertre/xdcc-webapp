"use strict";

var angular = require("angular");

var subtitleModule = angular.module("subtitle", []);

subtitleModule
  .factory("Subtitles", require("./resource/subtitles_resource"));

module.exports = subtitleModule.name;
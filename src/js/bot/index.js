"use strict";

var angular = require("angular");

var botModule = angular.module("bot", [require("angular-resource")]);

botModule
  .controller("BotListController", require("./controller/bot_list_controller"))
  .controller("BotController", require("./controller/bot_controller"))
  .factory("Bots", require("./resource/bots_resource"))
  .directive("enableWhenReadyToDownload", require("./directive/ready_to_download_directive"));

botModule
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/bot", {
        controller: "BotListController",
        templateUrl: "/templates/bot/index",
        resolve: {
          bots: ["Bots", function (Bots) {
            return Bots.getAll().$promise;
          }]
        }
      })
      .when("/bot/:id", {
        controller: "BotController",
        templateUrl: "/templates/bot/show",
        resolve: {
          bot: ["$route", "Bots", function ($route, Bots) {
            return Bots.get({ id: $route.current.params.id }).$promise;
          }]
        }
      });
  }]);

module.exports = botModule.name;
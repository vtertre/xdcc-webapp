"use strict";
module.exports = require("angular").module("bot", [require("angular-resource")])
  .controller("BotListController", require("./controller/bot_list_controller"))
  .controller("BotController", require("./controller/bot_controller"))
  .factory("Bots", require("./resource/bots_resource"))

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
  }])
  .name;
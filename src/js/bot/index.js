"use strict";
module.exports = require("angular").module("bot", [require("angular-resource")])

  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/bot", {
        controller: "BotListController",
        templateUrl: "/templates/bot/index",
        resolve: {
          bots: function (Bots) {
            return Bots.getAll().$promise;
          }
        }
      })
      .when("/bot/:id", {
        controller: "BotController",
        templateUrl: "/templates/bot/show",
        resolve: {
          bot: function ($route, Bots) {
            return Bots.get({id: $route.current.params.id}).$promise;
          }
        }
      });
  }])

  .controller("BotListController", require("./controller/bot_list_controller"))
  .controller("BotController", require("./controller/bot_controller"))
  .factory("Bots", require("./resource/bots_resource"))
  .name;
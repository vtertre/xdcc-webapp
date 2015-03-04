"use strict";
var angular = require("angular");

angular.module("xdcc", [require("angular-route"), require("./bot"), require("./login")])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/templates/index"
      })
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
      })
      .when("/login", {
        controller: "LoginController",
        templateUrl: "/templates/login/index"
      })
      .otherwise({
        redirectTo: "/"
      });
  }])

  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push(["$q", "$location", function ($q, $location) {
      return {
        request: function (config) {
          config.headers.Authorization = "Basic Atoken7838768A3748768";
          return config;
        },
        responseError: function (response) {
          if (response.status === 401 || response.status === 403) {
            $location.path("/login");
          }
          return $q.reject(response);
        }
      };
    }]);
  }]);
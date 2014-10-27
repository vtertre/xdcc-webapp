//= require bot/controller/bot_list_controller.js
//= require bot/controller/bot_controller.js
//= require common/controller/orchestrator_controller.js

(function (angular) {
  'use strict';
  angular.module("app", ['ngResource', 'ui.bootstrap', 'ui.utils', 'ngRoute', 'bot', 'common'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when("/index", {
          controller: 'BotListController',
          templateUrl: "/templates/index"
        })
        .when("/bot/:id", {
          controller: 'BotController',
          templateUrl: "/templates/bot"
        })
        .otherwise({
          redirectTo: '/index'
        });
    }]);
})(angular);
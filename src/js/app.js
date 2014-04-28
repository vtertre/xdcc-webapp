(function (angular) {
  'use strict';
  angular.module("app", ['ngResource', 'ngRoute', 'configuration', 'bot', 'common'])
    .config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
      console.log($routeProvider);
      $routeProvider
        .when("/index", {
          controller: 'BotListController',
          templateUrl: "/templates/index.html"
        })
        .when("/bot/:id", {
          controller: 'BotController',
          templateUrl: "/templates/bot.html"
        })
        .otherwise({
          redirectTo: '/index'
        });
      $httpProvider.interceptors.push('ConfigurationInterceptor');
    }])
    .factory('ConfigurationInterceptor', ['$q', '$rootScope', 'configuration', function ($q, $rootScope, configuration) {
      return {
        'request': function (config) {
          if (config.url.indexOf("/templates") != -1) {
            return config || $q.when(config);
          }
          config.url = configuration.urlApi + config.url;
          return config || $q.when(config);
        }
      };
    }]);
})(angular);
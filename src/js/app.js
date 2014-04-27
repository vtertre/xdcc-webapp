(function (angular) {
  'use strict';
  angular.module("app", ['ngResource', 'ngRoute', 'configuration', 'common'])
    .config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
      console.log($routeProvider);
      $routeProvider
        .when("/", {
          templateUrl: "/templates/index.html"
        })
        .otherwise({
          redirectTo: '/'
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
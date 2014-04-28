(function (angular) {
  'use strict';
  angular.module("bot")
    .factory("Bots", ['$resource', function ($resource) {
      return $resource("/bot/:id", {id: '@id'}, {
        getAll: {method: 'GET', isArray: true},
        get: {method: 'GET', isArray: false}
      });
    }]);
})(angular);
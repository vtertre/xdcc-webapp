(function (angular) {
  'use strict';
  angular.module("bot")
    .factory("Bots", ['$resource', function ($resource) {
      return $resource("/bot", {}, {
        get: {method: 'GET', isArray: true}
      });
    }]);
})(angular);
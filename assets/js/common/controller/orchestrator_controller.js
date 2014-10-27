//= require ../_module.js

(function (angular) {
  'use strict';

  angular.module('common')
    .controller('OrchestratorController', ['$scope', '$location', function ($scope, $location) {
      $scope.$location = $location;
    }]);
})(angular);
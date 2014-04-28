(function (angular) {
  'use strict';

  angular.module('bot')
    .controller('BotsController', ['$scope', 'Bots', function ($scope, Bots) {
      $scope.bots = Bots.get();
    }]);
})(angular);
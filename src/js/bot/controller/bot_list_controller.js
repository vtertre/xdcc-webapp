(function (angular) {
  'use strict';

  angular.module('bot')
    .controller('BotListController', ['$scope', 'Bots', function ($scope, Bots) {
      $scope.bots = Bots.getAll();
    }]);
})(angular);
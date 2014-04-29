(function (angular) {
  'use strict';

  angular.module('bot')
    .controller('BotListController', ['$scope', 'Bots', function ($scope, Bots) {
      $scope.errors = {
        show: false,
        content: 'Could not establish connection with remote API.'
      };
      $scope.bots = Bots.getAll(
        function () {
          $scope.errors.show = false;
        },
        function () {
          $scope.errors.show = true;
        }
      );
    }]);
})(angular);
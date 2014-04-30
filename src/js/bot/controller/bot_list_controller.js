(function (angular) {
  'use strict';

  angular.module('bot')
    .controller('BotListController', ['$scope', '$route', 'Bots', function ($scope, $route, Bots) {
      $scope.currentDate = new Date();
      $scope.errors = {
        show: false,
        content: ''
      };
      $scope.bots = Bots.getAll(
        function () {
          $scope.errors.show = false;
        },
        function () {
          $scope.errors.content = 'Could not establish connection with remote API.';
          $scope.errors.show = true;
        }
      );

      $scope.refreshList = function () {
        $route.reload();
      };
    }]);
})(angular);
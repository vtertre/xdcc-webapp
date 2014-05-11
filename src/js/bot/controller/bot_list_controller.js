(function (angular) {
  'use strict';

  angular.module('bot')
    .controller('BotListController', ['$scope', '$route', 'Bots', 'botService', function ($scope, $route, Bots, botService) {
      $scope.currentDate = new Date();
      $scope.errors = {
        show: false,
        content: ''
      };
      $scope.bots = Bots.getAll(
        // TODO Dunno how to test this
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

      $scope.hasNotBeenCheckedRecently = function (time) {
        var timeRepresentation = botService.getTimeDiff(time, $scope.currentDate);
        return (timeRepresentation.viable && timeRepresentation.hours >= 8);
      };
    }]);
})(angular);
"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($scope, $route, Bots, socket) {
  $scope.uuid = "bobby";
  $scope.currentDate = new Date();
  $scope.errors = {
    show: false,
    content: ""
  };
  $scope.bots = Bots.getAll(
    // TODO Dunno how to test this
    function () {
      $scope.errors.show = false;
    },
    function () {
      $scope.errors.content = "Could not establish connection with remote API.";
      $scope.errors.show = true;
    }
  );

  $scope.refreshList = function () {
    $route.reload();
  };

  /*$scope.hasNotBeenCheckedRecently = function (time) {
    var timeRepresentation = BotService.getTimeDiff(time, $scope.currentDate);
    return (timeRepresentation.viable && timeRepresentation.hours >= 6);
  };*/

  socket.emit("connect-client", $scope.uuid);
}
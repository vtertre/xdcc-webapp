"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($rootScope, $scope, $route, Bots, socket) {
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

  socket.emit("createSession", $scope.uuid);
  socket.on("sessionId", function (sessionId) {
    $rootScope.sessionId = sessionId;
  });
}
"use strict";

module.exports = ConnectedUserController;

/* @ngInject */
function ConnectedUserController($scope, Session) {
  $scope.disconnect = disconnect;

  function disconnect() {
    $scope.setCurrentUser(null);
    Session.destroy();
    $scope.$location.path("/");
  }
}
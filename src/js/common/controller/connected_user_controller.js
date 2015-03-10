"use strict";

module.exports = ConnectedUserController;

/* @ngInject */
function ConnectedUserController($scope, $rootScope, Session, AUTH_EVENTS) {
  $scope.disconnect = disconnect;

  function disconnect() {
    var userId = $scope.currentUser.id;
    Session.destroy();
    $scope.setCurrentUser(null);
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, userId);
  }
}
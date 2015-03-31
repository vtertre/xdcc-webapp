"use strict";

module.exports = OrchestratorController;

/* @ngInject */
function OrchestratorController($scope, AUTH_EVENTS, AuthenticationService, Session, socket) {
  $scope.currentUser = null;
  $scope.isAuthenticated = AuthenticationService.isAuthenticated;
  $scope.setCurrentUser = setCurrentUser;

  var user = Session.restoreIfAvailable();
  if (user) {
    setCurrentUser(user);
    socket.emit("restoreSession", user.id, user.login);
  }

  $scope.$on(AUTH_EVENTS.logoutSuccess, function (event, userId) {
    socket.emit("userLoggedOut", userId);
  });

  function setCurrentUser(user) {
    $scope.currentUser = user;
  }
}
"use strict";

module.exports = OrchestratorController;

/* @ngInject */
function OrchestratorController($scope, $location, USER_ROLES, AUTH_EVENTS, AuthenticationService, Session, socket) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthenticated = AuthenticationService.isAuthenticated;

  $scope.setCurrentUser = setCurrentUser;

  var user = Session.restoreIfAvailable();
  if (user) {
    setCurrentUser(user);
    socket.emit("restoreSession", user.id, user.login);
  }

  $scope.$on(AUTH_EVENTS.loginSuccess, function (event, userId, userLogin) {
    socket.emit("userLoggedIn", userId, userLogin);
    $location.path("/");
  });

  $scope.$on(AUTH_EVENTS.logoutSuccess, function (event, userId) {
    socket.emit("userLoggedOut", userId);
    $location.path("/");
  });

  function setCurrentUser(user) {
    $scope.currentUser = user;
  }
}
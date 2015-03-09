"use strict";

module.exports = OrchestratorController;

/* @ngInject */
function OrchestratorController($scope, $location, USER_ROLES, AuthenticationService, Session) {
  $scope.$location = $location;

  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthenticationService.isAuthorized;

  $scope.setCurrentUser = setCurrentUser;

  function setCurrentUser(user) {
    $scope.currentUser = user;
  }

  $scope.$on("auth-login-success", function () {
    $scope.$location.path("/");
  });

  var user = Session.restoreIfAvailable();
  if (user) {
    setCurrentUser(user);
  }
}
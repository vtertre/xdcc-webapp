"use strict";

module.exports = LoginController;

/* @ngInject */
function LoginController($scope, $rootScope, AuthenticationService, AUTH_EVENTS) {
  $scope.credentials = {
    login: undefined,
    password: undefined
  };

  $scope.connect = connect;

  function connect(credentials) {
    delete $scope.errors;
    AuthenticationService.connect(credentials).then(
      function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, user.id, user.login);
        $scope.setCurrentUser(user);

        resetCredentials();
      },
      function (response) {
        $scope.errors = response.data.errors;
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      }
    );
  }

  function resetCredentials() {
    $scope.credentials.login = undefined;
    $scope.credentials.password = undefined;
  }
}
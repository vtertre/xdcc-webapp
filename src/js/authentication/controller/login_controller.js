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
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);

        resetCredentials();
      },
      function (data, status) {
        console.info(data);
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        if (status === 400) {
          $scope.errors = $scope.errors || [];
          $scope.errors.push("Identifiant ou mot de passe invalide");
        }
      }
    );
  }

  function resetCredentials() {
    $scope.credentials.login = undefined;
    $scope.credentials.password = undefined;
  }
}
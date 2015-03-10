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
      function (data) {
        console.info(data);
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        if (data.status === 400) {
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
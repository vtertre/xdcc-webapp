"use strict";

module.exports = LoginController;

/* @ngInject */
function LoginController($scope, LoginService, $window) {
  $scope.credentials = {
    login: undefined,
    password: undefined
  };

  $scope.connect = connect;

  function connect(credentials) {
    delete $scope.errors;
    LoginService.connect(credentials).
      success(function (data) {
        $window.sessionStorage.token = data.token;
        resetCredentials();
      }).
      error(function (data, status) {
        console.info(data);
        delete $window.sessionStorage.token;
        if (status === 400) {
          $scope.errors = $scope.errors || [];
          $scope.errors.push("Identifiant ou mot de passe invalide");
        }
      });
  }

  function resetCredentials() {
    $scope.credentials.login = undefined;
    $scope.credentials.password = undefined;
  }
}
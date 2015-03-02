"use strict";

module.exports = LoginController;

/* @ngInject */
function LoginController($scope) {
  $scope.credentials = {
    login: undefined,
    password: undefined
  };

  $scope.connect = function (credentials) {
    console.log("Not yet implemented");
  };
}
"use strict";

module.exports = LoginService;

/* @ngInject */
function LoginService($http) {
  this.connect = function (credentials) {
    return $http.post("/api/login", credentials);
  };
}
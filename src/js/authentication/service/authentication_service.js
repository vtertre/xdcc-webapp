"use strict";

module.exports = AuthenticationService;

/* @ngInject */
function AuthenticationService($http, Session) {
  var self = this;

  self.connect = connect;
  self.isAuthenticated = isAuthenticated;
  self.isAuthorized = isAuthorized;

  function connect(credentials) {
    return $http.post("/api/login", credentials).
      then(function (response) {
        Session.create(response.data.token, response.data.user);
        return response.data.user;
      });
  }

  function isAuthenticated() {
    return !!Session.token &&
      !!Session.user.id &&
      !!Session.user.login &&
      Session.user.role === "member";
  }

  function isAuthorized(authorizedRoles) {
    if (authorizedRoles.constructor !== Array) {
      authorizedRoles = [authorizedRoles];
    }

    if (authorizedRoles.indexOf("*") !== -1) {
      return true;
    }

    return ((self.isAuthenticated()) && (authorizedRoles.indexOf(Session.user.role) !== -1));
  }
}
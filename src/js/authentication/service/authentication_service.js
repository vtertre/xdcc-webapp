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
      then(function (res) {
        Session.create(res.data.token, res.data.user);
        return res.data.user;
      });
  }

  function isAuthenticated() {
    return !!Session.token && !!Session.user.id;
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
"use strict";

module.exports = AuthenticationService;

/* @ngInject */
function AuthenticationService(Session) {
  var self = this;

  self.isAuthenticated = isAuthenticated;
  self.isAuthorized = isAuthorized;

  function isAuthenticated() {
    return !!(Session.user.token &&
      Session.user.id &&
      Session.user.login &&
      Session.user.role === "member");
  }

  function isAuthorized(authorizedRoles) {
    if (authorizedRoles.constructor !== Array) {
      authorizedRoles = [authorizedRoles];
    }

    if (authorizedRoles.indexOf("*") !== -1) {
      return true;
    }

    return self.isAuthenticated() && (authorizedRoles.indexOf(Session.user.role) !== -1);
  }
}
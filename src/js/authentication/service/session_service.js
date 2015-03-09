"use strict";

module.exports = SessionService;

/* @ngInject */
function SessionService($localStorage) {
  var self = this;

  self.create = create;
  self.destroy = destroy;
  self.restoreIfAvailable = restoreIfAvailable;

  self.token = null;
  self.user = {};

  function create(token, user) {
    $localStorage.token = self.token = token;
    $localStorage.user = self.user = {
      id: user.id,
      login: user.login,
      role: user.role
    };
  }

  function destroy() {
    $localStorage.$reset();
    self.token = null;
    self.user = {
      id: null,
      login: null,
      role: null
    };
  }

  function restoreIfAvailable() {
    if (!$localStorage.token) {
      return null;
    }

    self.token = $localStorage.token;
    self.user = {
      id: $localStorage.user.id,
      login: $localStorage.user.login,
      role: $localStorage.user.role
    };

    return $localStorage.user;
  }
}
"use strict";

module.exports = SessionService;

/* @ngInject */
function SessionService($localStorage) {
  var self = this;

  self.create = create;
  self.destroy = destroy;
  self.restoreIfAvailable = restoreIfAvailable;

  self.user = {};

  function create(token, user) {
    $localStorage.token = token;
    $localStorage.user = self.user = {
      id: user.id,
      login: user.login,
      role: user.role
    };
    self.user.token = token;
  }

  function destroy() {
    $localStorage.$reset();
    self.user = {
      token: null,
      id: null,
      login: null,
      role: null
    };
  }

  function restoreIfAvailable() {
    if (!isLocalStorageAvailable()) {
      return null;
    }

    self.user = {
      token: $localStorage.token,
      id: $localStorage.user.id,
      login: $localStorage.user.login,
      role: $localStorage.user.role
    };

    return self.user;
  }

  function isLocalStorageAvailable() {
    return $localStorage.token && $localStorage.user &&
      $localStorage.user.id && $localStorage.user.login &&
      $localStorage.user.role;
  }
}
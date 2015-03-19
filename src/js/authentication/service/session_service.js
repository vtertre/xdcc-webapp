"use strict";

module.exports = SessionService;

/* @ngInject */
function SessionService(locker) {
  var self = this;

  self.create = create;
  self.destroy = destroy;
  self.restoreIfAvailable = restoreIfAvailable;

  self.user = {};

  function create(token, user) {
    locker.put("token", token);
    self.user = {
      id: user.id,
      login: user.login,
      role: user.role
    };
    locker.put("user", self.user);
    self.user.token = token;
  }

  function destroy() {
    locker.empty();
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

    self.user = locker.get("user");
    self.user.token = locker.get("token");

    return self.user;
  }

  function isLocalStorageAvailable() {
    if (!locker.has("token") || !locker.has("user")) {
      return null;
    }
    var user = locker.get("user");
    return user.id && user.login && user.role;
  }
}
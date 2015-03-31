"use strict";

module.exports = SessionService;

/* @ngInject */
function SessionService(locker) {
  var self = this;

  self.destroy = destroy;
  self.restoreIfAvailable = restoreIfAvailable;

  self.user = null;

  function destroy() {
    locker.empty();
    self.user = null;
  }

  // TODO *** Verify the token
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
      return false;
    }
    var user = locker.get("user");
    return user.id && user.login && user.role;
  }
}
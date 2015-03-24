"use strict";
module.exports = require("angular").module("authentication", [require("angular-locker")])

  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  }])

  .config(["lockerProvider", function config(lockerProvider) {
    lockerProvider.setDefaultDriver("local")
      .setDefaultNamespace(false)
      .setSeparator(".")
      .setEventsEnabled(false);
  }])

  .constant("AUTH_EVENTS", {
    loginSuccess: "auth-login-success",
    loginFailed: "auth-login-failed",
    logoutSuccess: "auth-logout-success",
    sessionTimeout: "auth-session-timeout",
    unauthenticated: "auth-unauthenticated",
    unauthorized: "auth-unauthorized"
  })

  .constant("USER_ROLES", {
    all: "*",
    member: "member"
  })

  .run(function ($rootScope, AUTH_EVENTS, AuthenticationService, $window) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
      next.data = next.data || { authorizedRoles: ["*"] };
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthenticationService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthenticationService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.unauthorized);
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.unauthenticated);
          $window.location = "/login";
        }
      }
    });
  })

  .service("AuthenticationService", require("./service/authentication_service"))
  .service("Session", require("./service/session_service"))
  .factory("AuthInterceptor", require("./service/auth_interceptor_factory"))
  .name;
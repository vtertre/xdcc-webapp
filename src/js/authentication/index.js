"use strict";

var angular = require("angular");

var authenticationModule = angular.module("authentication", [require("angular-locker")]);

authenticationModule
  .service("AuthenticationService", require("./service/authentication_service"))
  .service("Session", require("./service/session_service"))
  .factory("AuthInterceptor", require("./service/auth_interceptor_factory"));

authenticationModule
  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
  }])

  .config(["lockerProvider", function config(lockerProvider) {
    lockerProvider
      .setDefaultDriver("local")
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

  .run(["$rootScope", "AUTH_EVENTS", "AuthenticationService", "$window",
    function ($rootScope, AUTH_EVENTS, AuthenticationService, $window) {
      $rootScope.$on("$routeChangeStart", function (event, next) {
        next.data = next.data || {authorizedRoles: ["*"]};
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
    }
  ]);

module.exports = authenticationModule.name;
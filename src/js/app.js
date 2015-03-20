"use strict";
var angular = require("angular");

angular.module("xdcc", [
  require("angular-bootstrap"),
  require("angular-route"),
  require("./common"),
  require("./bot"),
  require("./authentication"),
  require("./queue")
])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "/templates/index"
      })
      .when("/bot", {
        controller: "BotListController",
        templateUrl: "/templates/bot/index",
        resolve: {
          bots: function (Bots) {
            return Bots.getAll().$promise;
          }
        }
      })
      .when("/bot/:id", {
        controller: "BotController",
        templateUrl: "/templates/bot/show",
        resolve: {
          bot: function ($route, Bots) {
            return Bots.get({id: $route.current.params.id}).$promise;
          }
        }
      })
      .otherwise({
        redirectTo: "/"
      });
  }])

  .config(["lockerProvider", function config(lockerProvider) {
    lockerProvider.setDefaultDriver("local")
      .setDefaultNamespace(false)
      .setSeparator(".")
      .setEventsEnabled(false);
  }])

  .config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
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

  .constant("ORDER_OPTIONS", {
    ascending: false,
    descending: true
  })

  .run(function ($rootScope, AUTH_EVENTS, AuthenticationService, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next) {
      next.data = next.data || { authorizedRoles: ["*"] };
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthenticationService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthenticationService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.unauthorized);
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.unauthenticated);
          $location.path("/login");
        }
      }
    });
  });
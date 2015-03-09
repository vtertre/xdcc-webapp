"use strict";

module.exports = AuthInterceptorFactory;

/* @ngInject */
function AuthInterceptorFactory($rootScope, $q, $location, $localStorage, AUTH_EVENTS) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
       config.headers.Authorization = "Basic " + $localStorage.token;
       }
      return config;
    },
    responseError: function (response) {
      if (response.status === 401 || response.status === 403) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.unauthenticated,
          403: AUTH_EVENTS.unauthorized
        }[response.status], response);
        $location.path("/login");
      }
      return $q.reject(response);
    }
  };
}
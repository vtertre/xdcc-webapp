"use strict";

module.exports = AuthInterceptorFactory;

/* @ngInject */
function AuthInterceptorFactory($q, $location, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
       config.headers.Authorization = "Basic " + $window.sessionStorage.token;
       }
      return config;
    },
    responseError: function (response) {
      if (response.status === 401 || response.status === 403) {
        $location.path("/login");
      }
      return $q.reject(response);
    }
  };
}
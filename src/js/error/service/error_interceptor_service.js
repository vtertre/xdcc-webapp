"use strict";

module.exports = ErrorInterceptorService;

/* @ngInject */
function ErrorInterceptorService($q, $location) {
  return {
    responseError: function (rejection) {
      $location.path("/error");
      return $q.reject(rejection);
    }
  };
}
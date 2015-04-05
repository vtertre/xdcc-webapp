"use strict";

module.exports = Search;

/* @ngInject */
function Search($http) {
  return {
    search: function (query) {
      return $http.get("/api/search", {params: {q: query}});
    }
  };
}
"use strict";

module.exports = SearchController;

/* @ngInject */
function SearchController($scope, $window, Search) {
  $scope.loading = false;

  $scope.search = search;
  $scope.select = select;

  function search(query) {
    $scope.loading = true;
    return Search.search(query).then(function (response) {
      $scope.loading = false;
      return response.data;
    });
  }

  function select(bot) {
    $window.location.href = "#/bot/" + bot.id;
    $scope.selection = undefined;
  }
}
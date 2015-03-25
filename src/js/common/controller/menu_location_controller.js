"use strict";

module.exports = MenuLocationController;

/* @ngInject */
function MenuLocationController($scope, $location) {
  $scope.isCurrentLocation = isCurrentLocation;

  function isCurrentLocation(path) {
    return $location.path() === path;
  }
}
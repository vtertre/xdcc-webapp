"use strict";

module.exports = MenuLocationController;

/* @ngInject */
function MenuLocationController($location) {
  this.isCurrentLocation = isCurrentLocation;

  function isCurrentLocation(path) {
    return $location.path() === path;
  }
}
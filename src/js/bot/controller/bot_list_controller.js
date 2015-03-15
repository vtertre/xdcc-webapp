"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($scope, bots) {
  this.orderOptions = {
    ASCENDING: false,
    DESCENDING: true
  };

  $scope.orderOptions = this.orderOptions;
  $scope.bots = bots;
  $scope.sortOrder = this.orderOptions.ASCENDING;
}
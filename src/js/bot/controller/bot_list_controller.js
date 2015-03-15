"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($scope, bots) {
  $scope.orderOptions= {
    ASCENDING: false,
    DESCENDING: true
  };
  $scope.bots = bots;
  $scope.sortOrder = $scope.orderOptions.ASCENDING;
}
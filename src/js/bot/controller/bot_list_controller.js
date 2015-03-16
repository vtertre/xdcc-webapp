"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($scope, bots, ORDER_OPTIONS) {
  $scope.orderOptions = ORDER_OPTIONS;
  $scope.bots = bots;
  $scope.sortOrder = ORDER_OPTIONS.ascending;
}
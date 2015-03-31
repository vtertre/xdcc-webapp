"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($scope, bots, ORDER_OPTIONS) {
  $scope.bots = bots;
  $scope.orderOptions = ORDER_OPTIONS;
  $scope.sortOrder = ORDER_OPTIONS.ascending;
}
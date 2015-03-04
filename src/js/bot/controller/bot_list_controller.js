"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController($scope, bots) {
  $scope.bots = bots;
}
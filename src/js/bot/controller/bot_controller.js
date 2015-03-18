"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, bot, ORDER_OPTIONS) {
  $scope.bot = bot;
  $scope.orderOptions = ORDER_OPTIONS;
  $scope.sortOrder = ORDER_OPTIONS.descending;

  $scope.computePackUrl = computePackUrl;

  function computePackUrl(file) {
    return $scope.currentUser ? getUrlString(file.packId) : null;
  }

  function getUrlString(packId) {
    return "/bot/" + $scope.bot.id +
      "/pack/" + packId +
      "/download?bn=" + encodeURIComponent($scope.bot.name) +
      "&u=" + encodeURIComponent($scope.currentUser.id) +
      "&t=" + encodeURIComponent($scope.currentUser.token);
  }
}
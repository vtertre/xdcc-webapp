"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, bot, ORDER_OPTIONS) {
  var self = this;
  $scope.bot = bot;
  $scope.orderOptions = ORDER_OPTIONS;
  $scope.sortOrder = ORDER_OPTIONS.descending;

  $scope.addToDownloadQueue = addToDownloadQueue;

  function addToDownloadQueue(pack) {
    pack.url = self.computePackUrl(pack);
    pack.botName = bot.name;
    $scope.queue.push(pack);
  }

  self.computePackUrl = function(pack) {
    return $scope.currentUser ? getUrlString(pack.position) : null;
  };

  function getUrlString(packPosition) {
    return "/bot/" + $scope.bot.id +
      "/pack/" + packPosition +
      "/download?bn=" + encodeURIComponent($scope.bot.name) +
      "&u=" + encodeURIComponent($scope.currentUser.id) +
      "&t=" + encodeURIComponent($scope.currentUser.token);
  }
}
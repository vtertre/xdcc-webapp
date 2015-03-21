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

  self.computePackUrl = function(file) {
    return $scope.currentUser ? getUrlString(file.packId) : null;
  };

  function getUrlString(packId) {
    return "/bot/" + $scope.bot.id +
      "/pack/" + packId +
      "/download?bn=" + encodeURIComponent($scope.bot.name) +
      "&u=" + encodeURIComponent($scope.currentUser.id) +
      "&t=" + encodeURIComponent($scope.currentUser.token);
  }
}
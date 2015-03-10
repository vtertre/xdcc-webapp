"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, bot) {
  $scope.bot = bot;

  $scope.computePackUrl = computePackUrl;

  function computePackUrl(file) {
    return $scope.currentUser ? getUrlString(file.packId) : null;
  }

  function getUrlString(packId) {
    return "/bot/" + $scope.bot.id +
      "/pack/" + packId +
      "/download?botName=" + encodeURIComponent($scope.bot.name) +
      "&uuid=" + encodeURIComponent($scope.currentUser.id);
  }
}
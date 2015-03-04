"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, bot) {
  $scope.bot = bot;
  $scope.user = {
    id: "tmp"
  };

  $scope.computePackUrl = function (file) {
    return "/bot/" + $scope.bot.id + "/pack/" + file.packId +
      "/download?botName=" + encodeURIComponent($scope.bot.name) +
      "&sid=" + encodeURIComponent($scope.user.id);
  };
}
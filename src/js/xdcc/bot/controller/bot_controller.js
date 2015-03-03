"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, $routeParams, Bots) {
  $scope.bot = Bots.get({ id: $routeParams.id });

  $scope.computePackUrl = function (file) {
    return "/bot/" + $scope.bot.id + "/pack/" + file.packId +
      "/download?botName=" + encodeURIComponent($scope.bot.name) +
      "&sid=" + encodeURIComponent($scope.sessionId);
  };
}
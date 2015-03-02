"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, $routeParams, Bots, $window) {
  $scope.uuid = "bobby";
  $scope.bot = Bots.get({ id: $routeParams.id });

  $scope.download = function (file) {
    $window.open("/bot/" + $scope.bot.id + "/pack/" + file.packId + "/download?botName=" + encodeURIComponent($scope.bot.name) + "&uuid=" + $scope.uuid);
  };
}
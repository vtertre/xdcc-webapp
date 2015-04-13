"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, bot, Subtitles, ORDER_OPTIONS) {
  var self = this;
  $scope.bot = bot;
  $scope.orderOptions = ORDER_OPTIONS;
  $scope.sortOrder = ORDER_OPTIONS.descending;

  $scope.addToQueue = addToQueue;
  $scope.isPackInQueue = isPackInQueue;
  $scope.getSubtitlesUrl = getSubtitlesUrl;
  $scope.hasVideoType = hasVideoType;

  var validVideoExtension = {".avi": 1, ".mp4": 1, ".mkv": 1};

  function addToQueue(pack) {
    pack.url = self.computePackUrl(pack);
    pack.botName = bot.name;
    $scope.queue.push(pack);
  }

  function isPackInQueue(pack) {
    return ($scope.currentPack && $scope.currentPack.id === pack.id) || $scope.queue.contains(pack);
  }

  function getSubtitlesUrl(pack) {
    return Subtitles.getDownloadUrl(pack.name, "eng");
  }

  function hasVideoType(pack) {
    return !!(validVideoExtension[extension(pack.name)]);
  }

  self.computePackUrl = function(pack) {
    return $scope.currentUser ? getUrlString(pack.position) : null;
  };

  function getUrlString(packPosition) {
    return "/bot/" + $scope.bot.id +
      "/pack/" + packPosition +
      "/download?bn=" + encodeURIComponent($scope.bot.name) +
      "&u=" + $scope.currentUser.id +
      "&t=" + encodeURIComponent($scope.currentUser.token);
  }

  function extension(packName) {
    var dotIndex = packName.lastIndexOf(".");
    return (dotIndex <= 0) ? "" : packName.substring(dotIndex);
  }
}
"use strict";

module.exports = BotController;

/* @ngInject */
function BotController($scope, bot, Subtitles, ORDER_OPTIONS, QueueService) {
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
    pack.botNickname = bot.nickname;
    QueueService.queue.push(pack);
  }

  function isPackInQueue(pack) {
    return (QueueService.currentPack &&
      QueueService.currentPack.botId === pack.botId &&
      QueueService.currentPack.position === pack.position) || QueueService.queue.contains(pack);
  }

  function getSubtitlesUrl(pack) {
    return Subtitles.getDownloadUrl(pack.title, "eng");
  }

  function hasVideoType(pack) {
    return !!(validVideoExtension[extension(pack.title)]);
  }

  self.computePackUrl = function(pack) {
    return $scope.currentUser ? getUrlString(pack.position) : null;
  };

  function getUrlString(packPosition) {
    return "/bot/" + $scope.bot.id +
      "/pack/" + packPosition +
      "/download?bn=" + encodeURIComponent($scope.bot.nickname) +
      "&u=" + $scope.currentUser.id +
      "&t=" + encodeURIComponent($scope.currentUser.token);
  }

  function extension(packTitle) {
    var dotIndex = packTitle.lastIndexOf(".");
    return (dotIndex <= 0) ? "" : packTitle.substring(dotIndex);
  }
}
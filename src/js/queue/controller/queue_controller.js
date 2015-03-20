"use strict";

module.exports = QueueController;

/* @ngInject */
function QueueController($scope, socket, $window) {
  var self = this;
  self.queue = [];
  self.completed = [];

  $scope.autoStart = true;
  $scope.currentPack = undefined;

  $scope.addToDownloadQueue = addToDownloadQueue;

  socket.on("complete", function (pack) {
    if (pack.filename !== $scope.currentPack.name) {
      throw "Completed pack differs from current one.";
    }
    $scope.currentPack = self.queue.shift();
  });

  $scope.$watch("currentPack", function (newValue, oldValue) {
    if (oldValue) {
      self.completed.push(oldValue);
    }
    if (newValue) {
      self.startDownload(newValue);
    }
  });

  function addToDownloadQueue(pack) {
    // TODO *** uniqueness
    if (pack.constructor === Array) {
      if (!$scope.currentPack && $scope.autoStart) {
        $scope.currentPack = pack.shift();
      }
      self.queue = self.queue.concat(pack);
    } else {
      if (!$scope.currentPack && $scope.autoStart) {
        $scope.currentPack = pack;
      } else {
        self.queue.push(pack);
      }
    }
  }

  this.startDownload = function (pack) {
    $window.location = pack.url;
  };
}
"use strict";

module.exports = QueueController;

/* @ngInject */
function QueueController($scope, socket, $window) {
  var self = this;
  $scope.queue = [];
  $scope.completed = [];
  $scope.canceled = [];
  $scope.currentPack = undefined;
  $scope.autoStart = true;

  self.canStartDownloading = function () {
    return !$scope.currentPack && ($scope.queue.length > 0);
  };

  self.download = function (pack) {
    $window.location = pack.url;
  };

  $scope.$watch(self.canStartDownloading, function (canStartDownloading) {
    if (canStartDownloading && $scope.autoStart) {
      $scope.currentPack = $scope.queue.shift();
    }
  });

  $scope.$watch("currentPack", function (newPack, previousPack) {
    if (previousPack) {
      $scope[previousPack.canceled ? "canceled" : "completed"].push(previousPack);
    }
    if (newPack) {
      self.download(newPack);
    }
  });

  socket.on("xdcc:complete", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    $scope.currentPack = $scope.queue.shift();
  });

  socket.on("xdcc:canceled", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    $scope.currentPack.canceled = true;
    $scope.currentPack = $scope.queue.shift();
  });

  socket.on("xdcc:dlerror", function (error) {
    $scope.autoStart = false;
    $scope.currentPack.error = error.message;
    $scope.currentPack.canceled = true;
    $scope.currentPack = undefined;
  });

  function ensurePackMatchesCurrentOne(pack) {
    if (pack.filename !== $scope.currentPack.name) {
      throw "Completed pack differs from current one.";
    }
  }
}
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

  socket.on("xdcc:complete", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    $scope.currentPack = $scope.queue.shift();
  });

  socket.on("xdcc:canceled", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    $scope.currentPack.canceled = true;
    $scope.currentPack = $scope.queue.shift();
  });

  socket.on("xdcc:dlerror", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    $scope.autoStart = false;
    $scope.currentPack.canceled = true;
    $scope.currentPack = undefined;
  });

  $scope.$watch(self.canStartDownloading, function (canStartDownloading) {
    if (canStartDownloading && $scope.autoStart) {
      $scope.currentPack = $scope.queue.shift();
    }
  });

  $scope.$watch("currentPack", function (newValue, oldValue) {
    if (oldValue) {
      $scope[oldValue.canceled ? "canceled" : "completed"].push(oldValue);
    }
    if (newValue) {
      self.download(newValue);
    }
  });

  function ensurePackMatchesCurrentOne(pack) {
    if (pack.filename !== $scope.currentPack.name) {
      throw "Completed pack differs from current one.";
    }
  }
}
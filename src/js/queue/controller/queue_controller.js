"use strict";

module.exports = QueueController;

/* @ngInject */
function QueueController($scope, socket, $window) {
  var self = this;
  $scope.queue = [];
  $scope.completed = [];
  $scope.currentPack = undefined;
  $scope.autoStart = true;

  socket.on("complete", function (pack) {
    if (pack.filename !== $scope.currentPack.name) {
      throw "Completed pack differs from current one.";
    }
    $scope.currentPack = $scope.queue.shift();
  });

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

  $scope.$watch("currentPack", function (newValue, oldValue) {
    if (oldValue) {
      $scope.completed.push(oldValue);
    }
    if (newValue) {
      self.download(newValue);
    }
  });
}
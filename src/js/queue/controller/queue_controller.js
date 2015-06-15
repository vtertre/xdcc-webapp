"use strict";

module.exports = QueueController;

/* @ngInject */
function QueueController($scope, socket, QueueService) {
  var it = this;
  it.QueueService = QueueService;
  it.autoStart = true;

  it.canStartDownloading = function () {
    return !QueueService.currentPack && (QueueService.queue.length > 0);
  };

  $scope.$watch(it.canStartDownloading, function (canStartDownloading) {
    if (canStartDownloading && it.autoStart) {
      QueueService.currentPack = QueueService.queue.shift();
    }
  });

  socket.on("xdcc:complete", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    QueueService.currentPack = QueueService.queue.shift();
  });

  socket.on("xdcc:canceled", function (pack) {
    ensurePackMatchesCurrentOne(pack);
    QueueService.currentPack.canceled = true;
    QueueService.currentPack = QueueService.queue.shift();
  });

  socket.on("xdcc:dlerror", function (error) {
    it.autoStart = false;
    QueueService.currentPack.error = error.message;
    QueueService.currentPack.canceled = true;
    QueueService.currentPack = undefined;
  });

  function ensurePackMatchesCurrentOne(pack) {
    if (pack.filename !== QueueService.currentPack.title) {
      throw "Completed pack differs from current one.";
    }
  }
}

Object.defineProperty(QueueController.prototype, "currentPack", {
  enumerable: true,
  get: function () {
    return this.QueueService.currentPack;
  }
});

Object.defineProperty(QueueController.prototype, "queue", {
  enumerable: true,
  get: function () {
    return this.QueueService.queue;
  }
});
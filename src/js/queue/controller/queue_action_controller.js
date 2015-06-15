"use strict";

module.exports = QueueActionController;

/* @ngInject */
function QueueActionController($scope, QueueService) {
  $scope.removePack = removePack;

  function removePack(pack) {
    QueueService.queue.remove(pack);
  }
}
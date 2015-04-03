"use strict";

module.exports = QueueActionController;

/* @ngInject */
function QueueActionController($scope) {
  $scope.removePack = removePack;

  function removePack(packId) {
    $scope.queue.remove(packId);
  }
}
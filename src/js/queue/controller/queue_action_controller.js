"use strict";

module.exports = QueueActionController;

/* @ngInject */
function QueueActionController($scope) {
  $scope.removePack = removePack;

  function removePack(pack) {
    $scope.queue.remove(pack);
  }
}
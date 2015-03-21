"use strict";

module.exports = QueueActionController;

/* @ngInject */
function QueueActionController($scope) {
  $scope.removePack = removePack;

  function removePack(index) {
    $scope.queue.splice(index, 1);
  }
}
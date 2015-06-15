"use strict";

module.exports = QueueActionController;

/* @ngInject */
function QueueActionController(QueueService) {
  this.removePack = removePack;

  function removePack(pack) {
    QueueService.queue.remove(pack);
  }
}
"use strict";

var Queue = require("../model/queue");
var _ = require("underscore");

module.exports = QueueService;

/* @ngInject */
function QueueService($window) {
  this.$window = $window;
  this.queue = new Queue();
  this.completed = [];
  this.canceled = [];
  this._currentPack = undefined;
}

Object.defineProperty(QueueService.prototype, "currentPack", {
  enumerable: true,
  get: function () {
    return this._currentPack;
  },
  set: function (pack) {
    var previousPack = this._currentPack;
    if (!_.isEqual(previousPack, pack)) {
      if (previousPack) {
        this[previousPack.canceled ? "canceled" : "completed"].push(previousPack);
      }
      if (pack) {
        this.$window.location = pack.url;
      }
      this._currentPack = pack;
    }
  }
});


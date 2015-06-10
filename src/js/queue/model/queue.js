"use strict";

var _ = require("underscore");

module.exports = Queue;

function Queue() {
  this.packIdQueue = [];
  this.packMap = {};
  this.length = 0;
}

Queue.prototype.push = function (pack) {
  var packId = pack.botId + "_" + pack.position;
  this.packIdQueue.push(packId);
  this.packMap[packId] = pack;
  ++this.length;
};

Queue.prototype.shift = function () {
  var packId = this.packIdQueue.shift();
  var pack = this.packMap[packId];
  if (pack) {
    delete this.packMap[packId];
    --this.length;
  }
  return pack;
};

Queue.prototype.contains = function (pack) {
  var packId = pack.botId + "_" + pack.position;
  return !!(this.packMap[packId]);
};

Queue.prototype.remove = function (pack) {
  var packId = pack.botId + "_" + pack.position;
  var index = this.packIdQueue.indexOf(packId);
  if (index !== -1) {
    this.packIdQueue.splice(index, 1);
    delete this.packMap[packId];
    --this.length;
  }
};

Queue.prototype.getOrderedPacks = function () {
  var it = this;
  var orderedPacks = [];
  _.each(it.packIdQueue, function (packId) {
    orderedPacks.push(it.packMap[packId]);
  });
  return orderedPacks;
};

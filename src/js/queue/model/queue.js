"use strict";

module.exports = Queue;

function Queue() {
  this.packIdQueue = [];
  this.packMap = {};
  this.length = 0;

  this.push = function (pack) {
    this.packIdQueue.push(pack.id);
    this.packMap[pack.id] = pack;
    ++this.length;
  };

  this.get = function (packId) {
    return this.packMap[packId];
  };

  this.shift = function () {
    var pack = this.packMap[this.packIdQueue.shift()];
    if (pack) {
      delete this.packMap[pack.id];
      --this.length;
    }
    return pack;
  };

  this.contains = function (pack) {
    return !!(this.packMap[pack.id]);
  };

  this.remove = function (packId) {
    var index = this.packIdQueue.indexOf(packId);
    this.packIdQueue.splice(index, 1);
    delete this.packMap[packId];
    --this.length;
  };
}

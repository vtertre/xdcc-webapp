"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Queue", function () {

  var queue;

  beforeEach(function () {
    var Queue = require("./queue");
    queue = new Queue();
  });

  it("adds a pack to the queue", function () {
    var pack = { name: "name of the pack", id: "1234567" };
    queue.push(pack);

    expect(queue.packIdQueue[0]).to.equal(pack.id);
    expect(queue.packMap[pack.id]).to.deep.equal(pack);
    expect(queue.length).to.equal(1);
  });

  it("retrieves a pack from the queue", function () {
    var pack = { name: "name of the pack", id: "1234567" };
    queue.push(pack);

    var retrievedPack = queue.get(pack.id);

    expect(retrievedPack).to.deep.equal(pack);
  });

  it("shifts the first pack from the queue", function () {
    var pack = { name: "name of the pack", id: "1234567" };
    queue.push(pack);

    var firstPack = queue.shift();

    expect(firstPack).to.deep.equal(pack);
    expect(queue.packIdQueue.indexOf(firstPack.id)).to.equal(-1);
    expect(queue.packMap[firstPack.id]).to.be.undefined;
    expect(queue.length).to.equal(0);
  });

  it("is aware of the packs it contains", function () {
    var pack = { name: "name of the pack", id: "1234567" };
    var packNotInQueue = { name: "name of the pack", id: "7654321" };
    queue.push(pack);

    expect(queue.contains(pack)).to.be.true;
    expect(queue.contains(packNotInQueue)).to.be.false;
  });

  it("removes a pack from the queue", function () {
    var pack = { name: "name of the pack", id: "1234567" };
    queue.push(pack);

    queue.remove(pack.id);

    expect(queue.packIdQueue.indexOf(pack.id)).to.equal(-1);
    expect(queue.length).to.equal(0);
  });
});
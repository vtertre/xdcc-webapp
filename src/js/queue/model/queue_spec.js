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
    var pack = { title: "title of the pack", position: 2, botId: "1234567" };
    queue.push(pack);

    expect(queue.packIdQueue[0]).to.equal("1234567_2");
    expect(queue.packMap["1234567_2"]).to.deep.equal(pack);
    expect(queue.length).to.equal(1);
  });

  it("shifts the first pack from the queue", function () {
    var pack = { title: "title of the pack", position: 2, botId: "1234567" };
    queue.push(pack);

    var firstPack = queue.shift();

    expect(firstPack).to.deep.equal(pack);
    expect(queue.packIdQueue.indexOf("1234567_2")).to.equal(-1);
    expect(queue.packMap["1234567_2"]).to.be.undefined;
    expect(queue.length).to.equal(0);
  });

  it("must return undefined when shifting an empty queue", function () {
    var pack = queue.shift();

    expect(pack).to.be.undefined;
  });

  it("is aware of the packs it contains", function () {
    var pack = { title: "title of the pack", position: 2, id: "1234567" };
    var packNotInQueue = { title: "title of the pack", position: 3, id: "7654321" };
    queue.push(pack);

    expect(queue.contains(pack)).to.be.true;
    expect(queue.contains(packNotInQueue)).to.be.false;
  });

  it("removes a pack from the queue", function () {
    var pack = { title: "title of the pack", position: 2, id: "1234567" };
    queue.push(pack);

    queue.remove(pack);

    expect(queue.packIdQueue.indexOf("1234567_2")).to.equal(-1);
    expect(queue.length).to.equal(0);
  });

  it("must properly handle removing a pack which is not in the queue", function () {
    var pack = { title: "title of the pack", position: 2, id: "1234567" };
    queue.push(pack);

    queue.remove({title: "pack not in queue", position: 3, botId: "1234"});

    expect(queue.length).to.equal(1);
  });

  it("must return an array of packs matching the order of the id queue", function () {
    queue.push({title: "pack 2", position: 2, botId: "1234567"});
    queue.push({title: "pack 1", position: 1, botId: "1234567"});
    queue.push({title: "pack 3", position: 3, botId: "1234567"});

    var packsInOrder = queue.getOrderedPacks();

    expect(packsInOrder[0].title).to.equal("pack 2");
    expect(packsInOrder[1].title).to.equal("pack 1");
    expect(packsInOrder[2].title).to.equal("pack 3");
  });
});
"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

var Queue = require("../model/queue");

describe("QueueActionController", function () {

  var $scope, QueueService, controller;

  beforeEach(function () {
    $scope = {};
    QueueService = {
      queue: new Queue(),
      completed: [],
      canceled: [],
      currentPack: undefined
    };
    var QueueActionController = require("./queue_action_controller");
    controller = new QueueActionController($scope, QueueService);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must remove a pack from the download queue", function () {
    var packToRemove = {title: "title of the pack", position: 2, botId: "1234567"};
    QueueService.queue.push(packToRemove);
    $scope.removePack(packToRemove);
    expect(QueueService.queue.length).to.equal(0);
  });
});
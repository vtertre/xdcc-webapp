"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

var Queue = require("../model/queue");

describe("QueueActionController", function () {

  var $scope, controller;

  beforeEach(function () {
    $scope = {
      queue: new Queue()
    };
    var QueueActionController = require("./queue_action_controller");
    controller = new QueueActionController($scope);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must remove a pack from the download queue", function () {
    var packToRemove = {id: 1};
    $scope.queue.push(packToRemove);
    $scope.removePack(packToRemove.id);
    expect($scope.queue.length).to.equal(0);
  });
});
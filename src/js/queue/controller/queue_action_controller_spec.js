"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("QueueActionController", function () {

  var $scope, controller;

  beforeEach(function () {
    $scope = {
      queue: []
    };
    var QueueActionController = require("./queue_action_controller");
    controller = new QueueActionController($scope);
  });

  it("must remove a pack from the download queue", function () {
    var packToRemove = {id: 1};
    $scope.queue.push({id: 0}, packToRemove, {id: 2});
    $scope.removePack(1);
    expect($scope.queue).to.have.length(2);
    for (var i = 0; i < $scope.queue.length; ++i) {
      expect($scope.queue[i].id).to.not.equal(packToRemove.id);
    }
  });
});
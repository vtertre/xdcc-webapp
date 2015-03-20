"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("QueueController", function () {

  var $scope, socket, $window, controller;

  beforeEach(function () {
    $scope = {
      watchers: {},
      $watch: function (valueToWatch, callback) {
        $scope.watchers[valueToWatch] = callback;
      },
      change: function (valueToChange, newValue) {
        var oldValue = $scope[valueToChange];
        $scope[valueToChange] = newValue;
        $scope.watchers[valueToChange].call(null, newValue, oldValue);
      }
    };
    socket = {
      events: {},
      on: function (eventName, callback) {
        socket.events[eventName] = callback;
      },
      emit: function (eventName, arg) {
        socket.events[eventName].call(null, arg);
      }
    };
    $window = {
      location: ""
    };
    var QueueController = require("./queue_controller");
    controller = new QueueController($scope, socket, $window);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must set autoStart to true", function () {
    expect($scope.autoStart).to.be.true;
  });

  it("must start downloading immediately if none is running and autostart is on (single pack)", function () {
    var pack = {name: "name"};
    $scope.addToDownloadQueue(pack);
    expect(controller.queue).to.have.length(0);
    expect($scope.currentPack).to.deep.equal(pack);
  });

  it("must start downloading immediately if none is running and autostart is on (multiple packs)", function () {
    var packArray = [{id: 0}, {id: 1}, {id: 2}];
    $scope.addToDownloadQueue(packArray);
    expect(controller.queue).to.have.length(2);
    expect($scope.currentPack.id).to.equal(0);
  });

  it("must start downloading a new pack and set the old one as completed when the current pack changes", function () {
    var newPack = {name: "newPack", url: "/pack/newPack"};
    var currentPack = {name: "currentPack"};
    $scope.currentPack = currentPack;
    $scope.change("currentPack", newPack);
    expect(controller.completed.indexOf(currentPack)).to.not.equal(-1);
    expect($window.location).to.equal(newPack.url);
  });

  it("must not start downloading a new pack when the new value is null", function () {
    var currentPack = {name: "currentPack"};
    $scope.currentPack = currentPack;
    $scope.change("currentPack", null);
    expect(controller.completed.indexOf(currentPack)).to.not.equal(-1);
    expect($window.location).to.equal("");
  });

  it("must not add a new pack as completed if none was downloaded", function () {
    var newPack = {name: "newPack", url: "/pack/newPack"};
    $scope.change("currentPack", newPack);
    expect(controller.completed).to.have.length(0);
    expect($window.location).to.equal(newPack.url);
  });

  describe("with autoStart off", function () {
    beforeEach(function () {
      $scope.autoStart = false;
    });

    it("must add a pack at the beginning of the empty queue", function () {
      var pack = {name: "name"};
      $scope.addToDownloadQueue(pack);
      expect(controller.queue[0]).to.deep.equal(pack);
    });

    it("must be able to add multiple packs to the queue", function () {
      var packArray = [{name: "name"}, {}, {}, {}, {}];
      $scope.addToDownloadQueue(packArray);
      expect(controller.queue).to.have.length(5);
      expect(controller.queue[0].name).to.equal("name");
    });

    it("must preserve the order of the queue", function () {
      controller.queue = [{id: 0}, {id: 1}];
      var packArray = [{id: 2}, {id: 3}, {id: 4}];
      $scope.addToDownloadQueue(packArray);
      for (var i = 0; i < 5; ++i) {
        expect(controller.queue[i].id).to.equal(i);
      }
    });

    it("must start the next download when the proper event is received", function () {
      var futureCompleted = {filename: "current", name: "current"};
      $scope.currentPack = futureCompleted;
      controller.queue = [{name: "pending"}];

      socket.emit("complete", futureCompleted);
      expect($scope.currentPack.name).to.equal("pending");
      expect(controller.queue).to.have.length(0);
    });

    it("must not complete the download if the finished pack has a different name", function () {
      $scope.currentPack = {filename: "current", name: "current"};
      controller.queue = [{name: "pending"}];

      expect(socket.emit.bind(null, "complete", {filename: "different"})).to.throw();
      expect($scope.currentPack.name).to.equal("current");
      expect(controller.queue).to.have.length(1);
    });
  });
});
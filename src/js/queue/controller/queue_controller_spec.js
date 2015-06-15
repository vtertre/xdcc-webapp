"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var Queue = require("../model/queue");

describe("QueueController", function () {

  var $scope, socket, QueueService, controller;

  beforeEach(function () {
    $scope = {
      watchedFnCallback: undefined,
      watchers: {},
      $watch: function (valueToWatch, callback) {
        if (typeof (valueToWatch) === "function") {
          $scope.watchedFnCallback = callback;
        } else {
          $scope.watchers[valueToWatch] = callback;
        }
      },
      change: function (valueToChange, newValue) {
        if (typeof valueToChange === "function") {
          $scope.watchedFnCallback(newValue);
        } else {
          var oldValue = $scope[valueToChange];
          $scope[valueToChange] = newValue;
          $scope.watchers[valueToChange].call(null, newValue, oldValue);
        }
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
    QueueService = {
      queue: new Queue(),
      completed: [],
      canceled: [],
      currentPack: undefined
    };
    var QueueController = require("./queue_controller");
    controller = new QueueController($scope, socket, QueueService);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must set autoStart to true", function () {
    expect(controller.autoStart).to.be.true;
  });

  it("must start a new download as soon as a pack is added to the queue", function () {
    QueueService.queue.push({url: "/pack/1"});
    $scope.change(controller.canStartDownloading, true);

    expect(QueueService.currentPack.url).to.equal("/pack/1");
  });

  it("can start to download when none is in progress and the queue is not empty", function () {
    QueueService.queue.push({});

    expect(controller.canStartDownloading()).to.be.true;
  });

  it("cannot start downloading when a download is in progress", function () {
    QueueService.currentPack = {};
    QueueService.queue.push({});

    expect(controller.canStartDownloading()).to.be.false;
  });

  it("cannot start downloading when the queue is empty", function () {
    expect(controller.canStartDownloading()).to.be.false;
  });

  describe("socket events", function () {

    var pendingPack = {title: "pending"};

    beforeEach(function () {
      QueueService.queue.push(pendingPack);
    });

    it("must start the next download when the previous one is complete", function () {
      var futureCompleted = {filename: "current", title: "current"};
      QueueService.currentPack = futureCompleted;

      socket.emit("xdcc:complete", futureCompleted);

      expect(QueueService.currentPack).to.deep.equal(pendingPack);
      expect(QueueService.queue).to.have.length(0);
    });

    it("must not complete the download if the finished pack has a different title", function () {
      QueueService.currentPack = {filename: "current", title: "current"};

      expect(socket.emit.bind(null, "xdcc:complete", {filename: "different"})).to.throw();
      expect(QueueService.currentPack.title).to.equal("current");
      expect(QueueService.queue).to.have.length(1);
    });

    it("must start the next download when the previous one is canceled", function () {
      var futureCanceled = {filename: "current", title: "current"};
      QueueService.currentPack = futureCanceled;

      socket.emit("xdcc:canceled", futureCanceled);

      expect(QueueService.currentPack).to.deep.equal(pendingPack);
      expect(QueueService.queue).to.have.length(0);
    });

    it("must not start a new download if the canceled pack has a different title", function () {
      QueueService.currentPack = {filename: "current", title: "current"};

      expect(socket.emit.bind(null, "xdcc:canceled", {filename: "different"})).to.throw();
      expect(QueueService.currentPack.title).to.equal("current");
      expect(QueueService.queue).to.have.length(1);
    });

    it("must stop downloading when the previous download had an error", function () {
      var futurePackWithError = {title: "current"};
      var error = {message: "an error message"};
      QueueService.currentPack = futurePackWithError;

      socket.emit("xdcc:dlerror", error);

      expect(futurePackWithError.error).to.equal(error.message);
      expect(futurePackWithError.canceled).to.be.true;
      expect(QueueService.currentPack).to.be.undefined;
      expect(controller.autoStart).to.be.false;
      expect(QueueService.queue).to.have.length(1);
    });
  });

  describe("with autoStart off", function () {
    beforeEach(function () {
      controller.autoStart = false;
    });

    it("must not start a new download when a pack is added to the queue", function () {
      QueueService.queue.push({url: "/pack/1"}, {url: "/pack/2"});
      $scope.change(controller.canStartDownloading, true);

      expect(QueueService.currentPack).to.be.undefined;
    });
  });
});
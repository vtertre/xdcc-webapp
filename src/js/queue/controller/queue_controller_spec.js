"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("QueueController", function () {

  var $scope, socket, $window, controller;

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

  it("must start a new download as soon as a pack is added to the queue", function () {
    $scope.queue.push({ url: "/pack/1" }, { url: "/pack/2" });
    $scope.change(controller.canStartDownloading, true);

    expect($scope.currentPack.url).to.equal("/pack/1");
  });

  it("must start downloading a new pack and set the old one as completed when the current pack changes", function () {
    var newPack = { title: "newPack", url: "/pack/newPack" };
    var currentPack = { title: "currentPack" };
    $scope.currentPack = currentPack;
    $scope.change("currentPack", newPack);

    expect($scope.completed.indexOf(currentPack)).to.not.equal(-1);
    expect($window.location).to.equal(newPack.url);
  });

  it("must start downloading a new pack and set the old one as canceled when the previous was canceled", function () {
    var newPack = { title: "newPack", url: "/pack/newPack" };
    var currentPack = { title: "currentPack", canceled: true };
    $scope.currentPack = currentPack;
    $scope.change("currentPack", newPack);

    expect($scope.canceled.indexOf(currentPack)).to.not.equal(-1);
    expect($scope.completed.indexOf(currentPack)).to.equal(-1);
    expect($window.location).to.equal(newPack.url);
  });

  it("must not start downloading a new pack when the new value is null", function () {
    var currentPack = { title: "currentPack" };
    $scope.currentPack = currentPack;
    $scope.change("currentPack", null);

    expect($scope.completed.indexOf(currentPack)).to.not.equal(-1);
    expect($window.location).to.equal("");
  });

  it("must not add a new pack as completed if none was downloaded", function () {
    var newPack = { title: "newPack", url: "/pack/newPack" };
    $scope.change("currentPack", newPack);

    expect($scope.completed).to.have.length(0);
    expect($window.location).to.equal(newPack.url);
  });

  it("must set the location to url of the pack to download", function () {
    var pack = {url: "/pack/url"};
    controller.download(pack);
    expect($window.location).to.equal(pack.url);
  });

  it("can start to download when none is in progress and the queue is not empty", function () {
    $scope.queue.push({});

    expect(controller.canStartDownloading()).to.be.true;
  });

  it("cannot start downloading when a download is in progress", function () {
    $scope.currentPack = {};
    $scope.queue.push({});

    expect(controller.canStartDownloading()).to.be.false;
  });

  it("cannot start downloading when the queue is empty", function () {
    expect(controller.canStartDownloading()).to.be.false;
  });

  describe("socket events", function () {

    var pendingPack = { title: "pending" };

    beforeEach(function () {
      $scope.queue.push(pendingPack);
    });

    it("must start the next download when the previous one is complete", function () {
      var futureCompleted = { filename: "current", title: "current" };
      $scope.currentPack = futureCompleted;

      socket.emit("xdcc:complete", futureCompleted);

      expect($scope.currentPack).to.deep.equal(pendingPack);
      expect($scope.queue).to.have.length(0);
    });

    it("must not complete the download if the finished pack has a different title", function () {
      $scope.currentPack = { filename: "current", title: "current" };

      expect(socket.emit.bind(null, "xdcc:complete", { filename: "different" })).to.throw();
      expect($scope.currentPack.title).to.equal("current");
      expect($scope.queue).to.have.length(1);
    });

    it("must start the next download when the previous one is canceled", function () {
      var futureCanceled = { filename: "current", title: "current" };
      $scope.currentPack = futureCanceled;

      socket.emit("xdcc:canceled", futureCanceled);

      expect($scope.currentPack).to.deep.equal(pendingPack);
      expect($scope.queue).to.have.length(0);
    });

    it("must not start a new download if the canceled pack has a different title", function () {
      $scope.currentPack = { filename: "current", title: "current" };

      expect(socket.emit.bind(null, "xdcc:canceled", { filename: "different" })).to.throw();
      expect($scope.currentPack.title).to.equal("current");
      expect($scope.queue).to.have.length(1);
    });

    it("must stop downloading when the previous download had an error", function () {
      var futurePackWithError = { title: "current" };
      var error = { message: "an error message" };
      $scope.currentPack = futurePackWithError;

      socket.emit("xdcc:dlerror", error);

      expect(futurePackWithError.error).to.equal(error.message);
      expect(futurePackWithError.canceled).to.be.true;
      expect($scope.currentPack).to.be.undefined;
      expect($scope.autoStart).to.be.false;
      expect($scope.queue).to.have.length(1);
    });
  });

  describe("with autoStart off", function () {
    beforeEach(function () {
      $scope.autoStart = false;
    });

    it("must not start a new download when a pack is added to the queue", function () {
      $scope.queue.push({ url: "/pack/1" }, { url: "/pack/2" });
      $scope.change(controller.canStartDownloading, true);

      expect($scope.currentPack).to.be.undefined;
    });
  });
});
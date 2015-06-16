"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("The Queue service", function () {
  var $window, service;

  beforeEach(function () {
    $window = {location: ""};
    var QueueService = require("./queue_service");
    service = new QueueService($window);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must start downloading the new pack and set the old one as completed", function () {
    var currentPack = {title: "currentPack"};
    service.currentPack = currentPack;

    var newPack = {title: "newPack", url: "/pack/newPack"};
    service.currentPack = newPack;

    expect(service.completed.indexOf(currentPack)).to.not.equal(-1);
    expect(service.canceled.indexOf(currentPack)).to.equal(-1);
    expect($window.location).to.equal(newPack.url);
  });

  it("must start downloading the new pack and set the old one as canceled when its canceled property is true", function () {
    var currentPack = {title: "currentPack", canceled: true};
    service.currentPack = currentPack;

    var newPack = {title: "newPack", url: "/pack/newPack"};
    service.currentPack = newPack;

    expect(service.canceled.indexOf(currentPack)).to.not.equal(-1);
    expect(service.completed.indexOf(currentPack)).to.equal(-1);
    expect($window.location).to.equal(newPack.url);
  });

  it("must not start a new download when the new value is null", function () {
    var currentPack = {title: "currentPack", url: ""};
    service.currentPack = currentPack;

    service.currentPack = null;

    expect(service.completed.indexOf(currentPack)).to.not.equal(-1);
    expect($window.location).to.equal("");
  });

  it("must not add the current pack as completed if there is none", function () {
    var newPack = {title: "newPack", url: "/pack/newPack"};
    service.currentPack = newPack;

    expect(service.completed).to.have.length(0);
    expect($window.location).to.equal(newPack.url);
  });

  it("must ignore changes when the pack does not change", function () {
    service.currentPack = {title: "pack", url: "/path/to/pack"};
    service.currentPack = {title: "pack", url: "/path/to/pack"};

    expect(service.completed).to.have.length(0);
    expect(service.canceled).to.have.length(0);
  });
});
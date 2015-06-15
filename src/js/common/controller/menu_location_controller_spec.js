"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("MenuLocationController", function () {

  var $location, controller;

  beforeEach(function () {
    $location = {
      path: sinon.stub()
    };
    var MenuLocationController = require("./menu_location_controller");
    controller = new MenuLocationController($location);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must be aware of the current location", function () {
    $location.path.returns("/bot");
    expect(controller.isCurrentLocation("/bot")).to.be.true;
    expect(controller.isCurrentLocation("/queue")).to.be.false;
    expect(controller.isCurrentLocation("/bot/123456")).to.be.false;
  });
});
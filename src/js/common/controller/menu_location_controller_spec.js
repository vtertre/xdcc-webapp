"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("MenuLocationController", function () {

  var $scope, $location, controller;

  beforeEach(function () {
    $scope = {};
    $location = {
      path: sinon.stub()
    };
    var MenuLocationController = require("./menu_location_controller");
    controller = new MenuLocationController($scope, $location);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must be aware of the current location", function () {
    $location.path.returns("/bot");
    expect($scope.isCurrentLocation("/bot")).to.be.true;
    expect($scope.isCurrentLocation("/queue")).to.be.false;
    expect($scope.isCurrentLocation("/bot/123456")).to.be.false;
  });
});
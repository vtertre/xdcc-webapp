"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("BotListController", function () {

  var $scope, controller, bots;

  beforeEach(function () {
    $scope = {};
    bots = [
      { botName: "a_bot" }
    ];
    var BotListController = require("./bot_list_controller");
    controller = new BotListController($scope, bots);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must communicate with the scope", function () {
    expect($scope.bots).to.equal(bots);
  });
});
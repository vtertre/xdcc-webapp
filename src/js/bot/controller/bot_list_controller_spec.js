"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("BotListController", function () {

  var $scope, ORDER_OPTIONS, controller, bots;

  beforeEach(function () {
    $scope = {};
    ORDER_OPTIONS = {
      ascending: "ascending",
      descending: "descending"
    };
    bots = [
      { botName: "a_bot" }
    ];
    var BotListController = require("./bot_list_controller");
    controller = new BotListController($scope, bots, ORDER_OPTIONS);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must communicate with the scope", function () {
    expect($scope.bots).to.equal(bots);
  });

  it("must use ascending order by default", function () {
    expect($scope.sortOrder).to.equal($scope.orderOptions.ascending);
  });
});
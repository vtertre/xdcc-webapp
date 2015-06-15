"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("BotListController", function () {

  var ORDER_OPTIONS, controller, bots;

  beforeEach(function () {
    ORDER_OPTIONS = {
      ascending: "ascending",
      descending: "descending"
    };
    bots = [
      { nickname: "a_bot" }
    ];
    var BotListController = require("./bot_list_controller");
    controller = new BotListController(bots, ORDER_OPTIONS);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must communicate with the scope", function () {
    expect(controller.bots).to.equal(bots);
  });

  it("must use ascending order by default", function () {
    expect(controller.sortOrder).to.equal(controller.orderOptions.ascending);
  });
});
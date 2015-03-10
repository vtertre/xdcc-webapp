"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("BotController", function () {

  var $scope, controller, bot;

  beforeEach(function () {
    $scope = {};
    bot = {
      id: "botId",
      name: "a_bot",
      fileSet: [
        { name: "packName", packId: 1 }
      ]
    };
    var BotController = require("./bot_controller");
    controller = new BotController($scope, bot);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must communicate with the scope", function () {
    expect($scope.bot).to.equal(bot);
  });

  it("must compute the URL to download a pack", function () {
    $scope.currentUser = {
      id: "userId"
    };

    var file = bot.fileSet[0];

    var expectedUrl = "/bot/" + bot.id +
      "/pack/" + file.packId +
      "/download?botName=" + bot.name +
      "&uuid=" + $scope.currentUser.id;

    expect($scope.computePackUrl(file)).to.equal(expectedUrl);
  });
});
"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("BotController", function () {

  var $scope, ORDER_OPTIONS, controller, bot;

  beforeEach(function () {
    $scope = {
      currentUser: {
        token: "_%token123%_",
        id: "userId"
      },
      queue: []
    };
    ORDER_OPTIONS = {
      ascending: "ascending",
      descending: "descending"
    };
    bot = {
      id: "botId",
      name: "a_bot_with_%_special_$$_[characters]",
      fileSet: [
        { name: "packName", packId: 1 }
      ]
    };
    var BotController = require("./bot_controller");
    controller = new BotController($scope, bot, ORDER_OPTIONS);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must communicate with the scope", function () {
    expect($scope.bot).to.equal(bot);
  });

  it("must use ascending order by default", function () {
    expect($scope.sortOrder).to.equal($scope.orderOptions.descending);
  });

  it("must add a pack to the download queue with an URL", function () {
    var pack = {id: 1};
    $scope.addToDownloadQueue(pack);
    expect($scope.queue).to.have.length(1);
    expect($scope.queue[0].botName).to.equal(bot.name);
    expect($scope.queue[0].url).to.be.ok;
  });

  it("must compute the URL to download a pack", function () {
    var pack = bot.fileSet[0];

    var expectedUrl = "/bot/" + bot.id +
      "/pack/" + pack.packId +
      "/download?bn=" + encodeURIComponent(bot.name) +
      "&u=" + encodeURIComponent($scope.currentUser.id) +
      "&t=" + encodeURIComponent($scope.currentUser.token);

    expect(controller.computePackUrl(pack)).to.equal(expectedUrl);
  });

  describe("with no currentUser", function () {
    beforeEach(function () {
      $scope.currentUser = null;
    });

    it("must return null as the url of a pack", function () {
      var pack = bot.fileSet[0];
      expect(controller.computePackUrl(pack)).to.be.null;
    });
  });
});
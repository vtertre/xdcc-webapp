"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

var Queue = require("../../queue/model/queue");

describe("BotController", function () {

  var $scope, bot, Subtitles, ORDER_OPTIONS, QueueService, controller;

  beforeEach(function () {
    $scope = {
      currentUser: {
        token: "_%token123%_",
        id: "userId"
      }
    };
    bot = {
      id: "botId",
      nickname: "a_bot_with_%_special_$$_[characters]",
      packs: [
        {title: "packTitle", position: 1, botId: "1234"}
      ]
    };
    Subtitles = {
      getDownloadUrl: sinon.stub()
    };
    ORDER_OPTIONS = {
      ascending: "ascending",
      descending: "descending"
    };
    QueueService = {
      queue: new Queue(),
      completed: [],
      canceled: [],
      currentPack: undefined
    };
    var BotController = require("./bot_controller");
    controller = new BotController($scope, bot, Subtitles, ORDER_OPTIONS, QueueService);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must communicate with the scope", function () {
    expect($scope.bot).to.equal(bot);
  });

  it("must use descending order by default", function () {
    expect($scope.sortOrder).to.equal($scope.orderOptions.descending);
  });

  it("must add a pack to the download queue with an URL", function () {
    var pack = {title: "title of the pack", position: 2, botId: "1234567"};
    $scope.addToQueue(pack);

    var queuePack = QueueService.queue.packMap["1234567_2"];

    expect(QueueService.queue.length).to.equal(1);
    expect(queuePack.botNickname).to.equal(bot.nickname);
    expect(queuePack.url).to.be.defined;
  });

  it("can know if a pack is in the queue", function () {
    var pack = {title: "title of the pack", position: 2, botId: "1234567"};
    $scope.addToQueue(pack);

    expect($scope.isPackInQueue(pack)).to.be.true;
  });

  it("must compute the URL to download a pack", function () {
    var pack = bot.packs[0];

    var expectedUrl = "/bot/" + bot.id +
      "/pack/" + pack.position +
      "/download?bn=" + encodeURIComponent(bot.nickname) +
      "&u=" + $scope.currentUser.id +
      "&t=" + encodeURIComponent($scope.currentUser.token);

    expect(controller.computePackUrl(pack)).to.equal(expectedUrl);
  });

  it("must retrieve the URL to download the subtitles of a given pack", function () {
    Subtitles.getDownloadUrl.returns("/path/to/subtitles");
    var pack = {title: "title_of_the_pack"};

    var url = $scope.getSubtitlesUrl(pack);

    expect(url).to.equal(url);
  });

  it("must know if a pack has a video type", function () {
    expect($scope.hasVideoType({title: "title.of.the.pack.avi"})).to.be.true;
    expect($scope.hasVideoType({title: "title._of_the_pack.mp4"})).to.be.true;
    expect($scope.hasVideoType({title: "pack.mkv"})).to.be.true;
    expect($scope.hasVideoType({title: "subtitles.srt"})).to.be.false;
    expect($scope.hasVideoType({title: "zip_file.zip"})).to.be.false;
    expect($scope.hasVideoType({title: "no_extension"})).to.be.false;
  });

  describe("with no current user", function () {
    beforeEach(function () {
      $scope.currentUser = null;
    });

    it("must return null as the url of a pack", function () {
      var pack = bot.packs[0];
      expect(controller.computePackUrl(pack)).to.be.null;
    });
  });
});
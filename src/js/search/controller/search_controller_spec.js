"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("SearchController", function () {

  var $window, Search, controller;

  beforeEach(function () {
    $window = {
      location: {href: ""}
    };
    Search = {
      search: sinon.stub()
    };
    var SearchController = require("./search_controller");
    controller = new SearchController($window, Search);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must search and retrieve content based on the query", function () {
    var response = {data: [{nickname: "heyhello"}, {nickname: "hellohello"}]};
    Search.search.returns({then: function (callback) { return callback(response); }});

    var result = controller.search("hello");

    expect(Search.search).to.have.been.calledWith("hello");
    expect(result).to.deep.equal(response.data);
  });

  it("must redirect the user to the page of the selected bot", function () {
    var bot = {nickname: "nickname of the bot", id: "12345"};

    controller.select(bot);

    expect($window.location.href).to.equal("#/bot/12345");
  });
});
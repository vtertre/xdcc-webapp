"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("SearchController", function () {

  var $scope, $window, Search, controller;

  beforeEach(function () {
    $scope = {};
    $window = {
      location: {href: ""}
    };
    Search = {
      search: sinon.stub()
    };
    var SearchController = require("./search_controller");
    controller = new SearchController($scope, $window, Search);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must search and retrieve content based on the query", function () {
    var response = {data: [{name: "heyhello"}, {name: "hellohello"}]};
    Search.search.returns({then: function (callback) { return callback(response); }});

    var result = $scope.search("hello");

    expect(Search.search).to.have.been.calledWith("hello");
    expect(result).to.deep.equal(response.data);
  });

  it("must redirect the user to the page of the selected bot", function () {
    var bot = {name: "name of the bot", id: "12345"};

    $scope.select(bot);

    expect($window.location.href).to.equal("#/bot/12345");
  });
});
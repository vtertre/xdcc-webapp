"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Search", function () {

  var $http, resource;

  beforeEach(function () {
    $http = {
      get: sinon.stub()
    };
    var Bots = require("./search_resource");
    resource = new Bots($http);
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("must send a well formed GET request", function () {
    resource.search("query");

    expect($http.get).to.have.been.calledWith("/api/bot/search", {params: {q: "query"}});
  });

  it("must return the result of the GET request", function () {
    $http.get.returns("promise");

    expect(resource.search("query")).to.equal("promise");
  });
});
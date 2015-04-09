"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Search", function () {

  var $http, resource;

  beforeEach(function () {
    $http = {
      get: sinon.stub()
    };
    var Search = require("./search_resource");
    resource = new Search($http);
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("must send a well formed GET request", function () {
    resource.search("query");

    expect($http.get).to.have.been.calledWith("/api/search", {params: {q: "query"}});
  });

  it("must return the result of the GET request", function () {
    $http.get.returns("promise");

    expect(resource.search("query")).to.equal("promise");
  });
});
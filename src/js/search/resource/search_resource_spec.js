"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Search", function () {

  var httpResponse, $http, resource;

  beforeEach(function () {
    httpResponse = {data: undefined};
    $http = {
      get: sinon.stub().returns({then: function (callback) { return callback(httpResponse); }})
    };
    var Search = require("./search_resource");
    resource = new Search($http);
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("must send a well formed GET request", function () {
    httpResponse.data = "data";
    resource.search("query");

    expect($http.get).to.have.been.calledWith("/api/search", {params: {q: "query"}});
  });

  it("must return the result of the GET request", function () {
    httpResponse.data = "search result";

    expect(resource.search("query")).to.equal("search result");
  });
});
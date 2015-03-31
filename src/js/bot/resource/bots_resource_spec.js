"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Bots", function () {

  var $resource, actualResource, resource;

  beforeEach(function () {
    actualResource = { getAll: function () {} };
    $resource = sinon.stub().returns(actualResource);
    var Bots = require("./bots_resource");
    resource = new Bots($resource);
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("must create the resource", function () {
    expect($resource).to.have.been.calledWith(
      "/api/bot/:id",
      { id: "@id" },
      {
        getAll: { method: "GET", isArray: true },
        get: { method: "GET", isArray: false }
      }
    );
    expect(resource).to.deep.equal(actualResource);
  });
});
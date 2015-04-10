"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;

describe("Subtitle", function () {

  var resource;

  beforeEach(function () {
    var Subtitles = require("./subtitles_resource");
    resource = new Subtitles();
  });

  it("must be defined", function () {
    expect(resource).to.be.defined;
  });

  it("must compute the url of a given pack and language", function () {
    var url = resource.getDownloadUrl("name_of_the_[pack]", "lang");

    expect(url).to.equal("/sub-api/download?l=lang&q=name_of_the_%5Bpack%5D");
  });
});
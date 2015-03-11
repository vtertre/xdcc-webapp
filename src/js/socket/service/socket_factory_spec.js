"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("socket", function () {

  var socketFactory, factory;

  beforeEach(function () {
    socketFactory = sinon.spy();
    var SocketFactory = require("./socket_factory");
    factory = new SocketFactory(socketFactory);
  });

  it("must be defined", function () {
    expect(factory).to.be.defined;
  });

  it("must create a socket", function () {
    expect(socketFactory).to.have.been.called;
  });
});
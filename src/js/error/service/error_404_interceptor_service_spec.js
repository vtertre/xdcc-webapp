"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Error404InterceptorService", function () {
  var $q, $location, service;

  beforeEach(function () {
    $q = {reject: sinon.spy()};
    $location = {path: sinon.spy()};
    var Error404InterceptorService = require("./error_404_interceptor_service");
    service = new Error404InterceptorService($q, $location);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must redirect to page 404 when a 404 error occurs", function () {
    var rejection = {status: 404};
    service.responseError(rejection);

    expect($q.reject).to.have.been.calledWith(rejection);
    expect($location.path).to.have.been.calledWith("/404");
  });

  it("must not redirect to page 404 when an error is not a 404", function () {
    var rejection = {status: 401};
    service.responseError(rejection);

    expect($location.path).to.not.have.been.called;
  });
});
"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("ErrorInterceptorService", function () {
  var $q, $location, service;

  beforeEach(function () {
    $q = {reject: sinon.spy()};
    $location = {path: sinon.spy()};
    var ErrorInterceptorService = require("./error_interceptor_service");
    service = new ErrorInterceptorService($q, $location);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must redirect to the error page", function () {
    var rejection = {status: 500};
    service.responseError(rejection);

    expect($q.reject).to.have.been.calledWith(rejection);
    expect($location.path).to.have.been.calledWith("/error");
  });
});
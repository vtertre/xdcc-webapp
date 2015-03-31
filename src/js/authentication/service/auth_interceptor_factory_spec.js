"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("AuthInterceptor", function () {

  var $rootScope, $q, $window, Session, AUTH_EVENTS, factory;

  beforeEach(function () {
    $rootScope = {
      $broadcast: sinon.spy()
    };
    $q = {
      reject: sinon.stub()
    };
    $window = {
      location: undefined
    };
    Session = {
      token: "token123"
    };
    AUTH_EVENTS = {
      unauthenticated: "unauthenticated",
      unauthorized: "unauthorized"
    };
    var AuthInterceptorFactory = require("./auth_interceptor_factory");
    factory = new AuthInterceptorFactory($rootScope, $q, $window, Session, AUTH_EVENTS);
  });

  it("must be defined", function () {
    expect(factory).to.be.defined;
  });

  it("must add the authorization header if a token is present in the local storage", function () {
    var config = {};
    factory.request(config);
    expect(config.headers.Authorization).to.equal("Basic " + Session.token);
  });

  it("must not add the authorization header if no token is present in the local storage", function () {
    Session.token = undefined;
    var config = {};
    factory.request(config);
    expect(config.headers.Authorization).to.be.undefined;
  });

  it("must redirect 401 errors to the login page", function () {
    var response = {
      status: 401
    };

    $q.reject.returns("rejected");

    var result = factory.responseError(response);
    expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.unauthenticated, response);
    expect($window.location).to.equal("/login");
    expect($q.reject).to.have.been.calledWith(response);
    expect(result).to.equal("rejected");
  });

  it("must redirect 403 errors to the login page", function () {
    var response = {
      status: 403
    };

    $q.reject.returns("rejected");

    var result = factory.responseError(response);
    expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.unauthorized, response);
    expect($window.location).to.equal("/login");
    expect($q.reject).to.have.been.calledWith(response);
    expect(result).to.equal("rejected");
  });
});
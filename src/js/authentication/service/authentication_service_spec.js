"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("AuthenticationService", function () {

  var $http, Session, service;

  beforeEach(function () {
    $http = {
      post: sinon.stub()
    };
    Session = {
      create: sinon.spy()
    };
    var AuthenticationService = require("./authentication_service");
    service = new AuthenticationService($http, Session);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must send a post request and create the session", function () {
    var credentials = {};

    var response = {
      data: {
        token: "token123",
        user: { id: "id" }
      }
    };

    Session.user = response.data.user;
    Session.user.token = response.data.token;

    $http.post.returns({
      then: function (callback) {
        return callback.call(null, response);
      }
    });

    var callbackResult = service.connect(credentials);

    expect($http.post).to.have.been.calledWith("/sessions", credentials);
    expect(Session.create).to.have.been.calledWith(response.data.token, response.data.user);
    expect(callbackResult.id).to.equal(response.data.user.id);
    expect(callbackResult.token).to.equal(response.data.user.token);
  });

  it("must consider the user authenticated", function () {
    Session.user = {
      token: "token123",
      id: "id",
      login: "login",
      role: "member"
    };

    expect(service.isAuthenticated()).to.be.true;
  });

  it("must consider the user unauthenticated when the token is null", function () {
    Session.user = {
      token: null,
      id: "id",
      login: "login",
      role: "member"
    };

    expect(service.isAuthenticated()).to.be.false;
  });

  it("must consider the user unauthenticated when the id is null", function () {
    Session.user = {
      token: "token123",
      id: null,
      login: "login",
      role: "member"
    };

    expect(service.isAuthenticated()).to.be.false;
  });

  it("must consider the user unauthenticated when the login is null", function () {
    Session.user = {
      token: "token123",
      id: "id",
      login: null,
      role: "member"
    };

    expect(service.isAuthenticated()).to.be.false;
  });

  it("must consider the user unauthenticated when the role differs from member", function () {
    Session.user = {
      token: "token123",
      id: "id",
      login: "login",
      role: "*"
    };

    expect(service.isAuthenticated()).to.be.false;
  });

  it("must always authorize the wildcard role", function () {
    expect(service.isAuthorized("*")).to.be.true;
  });

  it("must authorize a user with the proper role", function () {
    Session.user = {
      token: "token123",
      id: "id",
      login: "login",
      role: "member"
    };

    expect(service.isAuthorized(["member"])).to.be.true;
  });

  it("must reject a user who is not authenticated", function () {
    Session.user = {
      token: null,
      id: null,
      login: null,
      role: null
    };

    expect(service.isAuthorized(["member"])).to.be.false;
  });

  it("must reject a user who does not have the proper role", function () {
    Session.user = {
      token: "token123",
      id: "id",
      login: "login",
      role: "anything"
    };

    expect(service.isAuthorized(["member"])).to.be.false;
  });
});
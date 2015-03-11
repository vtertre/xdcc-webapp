"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Session", function () {

  var $localStorage, service, token, user;

  beforeEach(function () {
    $localStorage = {
      $reset: sinon.spy()
    };
    token = "token123";
    user = {
      id: "id",
      login: "login",
      role: "member"
    };
    var SessionService = require("./session_service");
    service = new SessionService($localStorage);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must properly create the session", function () {
    service.create(token, user);

    expect(service.token).to.equal(token);
    expect(service.user).to.deep.equal(user);

    expect($localStorage.token).to.equal(token);
    expect($localStorage.user).to.deep.equal(user);
  });

  it("must properly destroy the session", function () {
    service.destroy();

    expect(service.token).to.be.null;
    expect(service.user.id).to.be.null;
    expect(service.user.login).to.be.null;
    expect(service.user.role).to.be.null;

    expect($localStorage.$reset).to.have.been.called;
  });

  it("must return null is no local storage is available", function () {
    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;
  });

  it("must return the user stored in local storage", function () {
    $localStorage.token = token;
    $localStorage.user = user;

    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.deep.equal($localStorage.user);
    expect(service.token).to.equal(token);
    expect(service.user).to.deep.equal(user);
  });

  it("must return null if the token is missing", function () {
    $localStorage.token = null;
    $localStorage.user = user;

    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;
  });

  it("must return null if any of the user info is missing", function () {
    $localStorage.token = token;
    $localStorage.user = user;

    $localStorage.user.id = null;
    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;

    $localStorage.user.id = user.id;
    $localStorage.user.login = null;
    expect(storedUser).to.be.null;

    $localStorage.user.login = user.login;
    $localStorage.user.role = null;
    expect(storedUser).to.be.null;
  });
});
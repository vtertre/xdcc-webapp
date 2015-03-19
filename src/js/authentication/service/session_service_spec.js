"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("Session", function () {

  var locker, mockStorage, service, token, user;

  beforeEach(function () {
    locker = {
      empty: sinon.spy(),
      has: sinon.stub(),
      get: sinon.stub(),
      put: function (key, value) { mockStorage[key] = value; }
    };
    mockStorage = {};
    token = "_%token123%_";
    user = {
      id: "id",
      login: "login",
      role: "member"
    };
    var SessionService = require("./session_service");
    service = new SessionService(locker);
  });

  it("must be defined", function () {
    expect(service).to.be.defined;
  });

  it("must properly create the session", function () {
    service.create(token, user);

    expect(service.user.token).to.equal(token);
    expect(service.user.id).to.equal(user.id);
    expect(service.user.login).to.equal(user.login);
    expect(service.user.role).to.equal(user.role);

    expect(mockStorage.token).to.equal(token);
    expect(mockStorage.user.id).to.equal(user.id);
    expect(mockStorage.user.login).to.equal(user.login);
    expect(mockStorage.user.role).to.equal(user.role);
  });

  it("must properly destroy the session", function () {
    service.destroy();

    expect(service.user.token).to.be.null;
    expect(service.user.id).to.be.null;
    expect(service.user.login).to.be.null;
    expect(service.user.role).to.be.null;

    expect(locker.empty).to.have.been.called;
  });

  it("must return null is no local storage is available", function () {
    locker.has.returns(false);
    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;
  });

  it("must return the user stored in local storage", function () {
    locker.has.returns(true);
    locker.get.withArgs("token").returns(token);
    locker.get.withArgs("user").returns(user);

    var storedUser = service.restoreIfAvailable();
    expect(storedUser.token).to.equal(token);
    expect(storedUser.id).to.equal(user.id);
    expect(storedUser.login).to.equal(user.login);
    expect(storedUser.role).to.equal(user.role);
    expect(service.user).to.deep.equal(storedUser);
  });

  it("must return null if the token is missing", function () {
    locker.get.withArgs("token").returns(null);
    locker.get.withArgs("user").returns(user);

    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;
  });

  it("must return null if any of the user info is missing", function () {
    locker.get.withArgs("token").returns(token);
    locker.get.withArgs("user").returns(user);

    user.id = null;
    var storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;

    user.id = "id";
    user.login = null;
    storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;

    user.login = "login";
    user.role = null;
    storedUser = service.restoreIfAvailable();
    expect(storedUser).to.be.null;
  });
});
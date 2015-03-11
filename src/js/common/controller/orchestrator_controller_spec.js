"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("OrchestratorController", function () {

  var $scope, $location, USER_ROLES, AUTH_EVENTS, AuthenticationService, Session, socket, controller;

  beforeEach(function () {
    $scope = {
      $on: sinon.spy()
    };
    $location = {};
    USER_ROLES = {};
    Session = {
      restoreIfAvailable: sinon.spy()
    };
    AUTH_EVENTS = {};
    AuthenticationService = {};
    socket = {};
    var ConnectedUserController = require("./orchestrator_controller");
    controller = new ConnectedUserController($scope, $location, USER_ROLES, AUTH_EVENTS, AuthenticationService, Session, socket);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must update the current user", function () {
    var user = {
      id: "userId",
      login: "userLogin"
    };
    $scope.setCurrentUser(user);
    expect($scope.currentUser).to.deep.equal(user);
  });
});
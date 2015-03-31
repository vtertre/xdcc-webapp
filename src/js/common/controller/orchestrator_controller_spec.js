"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("OrchestratorController", function () {

  var $scope, AUTH_EVENTS, AuthenticationService, Session, socket, user, controller;

  beforeEach(function () {
    user = {
      id: "userId",
      login: "userLogin"
    };
    $scope = {
      events: {},
      $on: function (eventName, callback) {
        $scope.events[eventName] = callback;
      },
      procEvent: function (eventName, event, arg) {
        $scope.events[eventName].call(null, event, arg);
      }
    };
    AUTH_EVENTS = {
      logoutSuccess: "logoutSuccess"
    };
    AuthenticationService = {};
    socket = {
      emit: sinon.spy()
    };
  });

  describe("whether or not there is an existing session", function () {
    beforeEach(function () {
      Session = {
        restoreIfAvailable: sinon.stub().returns(null)
      };
      var ConnectedUserController = require("./orchestrator_controller");
      controller = new ConnectedUserController($scope, AUTH_EVENTS, AuthenticationService, Session, socket);
    });

    it("must be defined", function () {
      expect(controller).to.be.defined;
    });

    it("must try to restore the session when loading", function () {
      expect(Session.restoreIfAvailable).to.have.been.called;
    });

    it("must update the current user", function () {
      $scope.setCurrentUser(user);
      expect($scope.currentUser).to.deep.equal(user);
    });

    it("must emit an event on the socket when the logout event is emitted on the scope", function () {
      $scope.procEvent(AUTH_EVENTS.logoutSuccess, null, user.id);
      expect(socket.emit).to.have.been.calledWith("userLoggedOut", user.id);
    });
  });

  describe("with an existing session", function () {
    beforeEach(function () {
      Session = {
        restoreIfAvailable: sinon.stub().returns(user)
      };
      var ConnectedUserController = require("./orchestrator_controller");
      controller = new ConnectedUserController($scope, AUTH_EVENTS, AuthenticationService, Session, socket);
    });

    it("must be defined", function () {
      expect(controller).to.be.defined;
    });

    it("must set the session user in the scope", function () {
      expect($scope.currentUser).to.deep.equal(user);
    });

    it("must emit an event on the socket with some user info", function () {
      expect(socket.emit).to.have.been.calledWith("restoreSession", user.id, user.login);
    });
  });
});
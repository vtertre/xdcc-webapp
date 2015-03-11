"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("ConnectedUserController", function () {

  var $rootScope, $scope, Session, AUTH_EVENTS, controller;

  beforeEach(function () {
    $rootScope = {
      $broadcast: sinon.spy()
    };
    $scope = {
      currentUser: {
        id: "userId"
      },
      setCurrentUser: sinon.spy()
    };
    Session = {
      destroy: sinon.spy()
    };
    AUTH_EVENTS = {
      logoutSuccess: "loggedOut"
    };
    var ConnectedUserController = require("./connected_user_controller");
    controller = new ConnectedUserController($scope, $rootScope, Session, AUTH_EVENTS);
  });

  it("must be defined", function () {
    expect(controller).to.be.defined;
  });

  it("must destroy the current session", function () {
    $scope.disconnect();
    expect(Session.destroy).to.have.been.called;
  });

  it("must reset the current user", function () {
    $scope.disconnect();
    expect($scope.setCurrentUser).to.have.been.calledWith(null);
  });

  it("must broadcast the logout event throughout the app", function () {
    $scope.disconnect();
    expect($rootScope.$broadcast).to.have.been.calledWith(AUTH_EVENTS.logoutSuccess, $scope.currentUser.id);
  });
});
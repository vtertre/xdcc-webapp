"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("xdccClientState", function () {
  var element, socket, directive;

  beforeEach(function () {
    element = { css: sinon.spy() };
    socket = {
      events: {},
      on: function (eventName, callback) {
        socket.events[eventName] = callback;
      },
      emit: function (eventName, arg) {
        socket.events[eventName].call(null, arg);
      }
    };
    var XdccClientState = require("./client_state_directive");
    directive = new XdccClientState(socket);
    directive.link(null, element);
  });

  it("waits for the client to connect", function () {
    socket.emit("xdcc:clientConnected");
    expect(element.css).to.have.been.calledWith("color");
  });

  it("must inform the user when something is wrong with the client", function () {
    socket.emit("xdcc:clientError");
    expect(element.css).to.have.been.calledWith("color");
  });
});
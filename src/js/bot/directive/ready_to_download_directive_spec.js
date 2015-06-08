"use strict";

var expect = require("chai").use(require("sinon-chai")).expect;
var sinon = require("sinon");

describe("ReadyToDownloadDirective", function () {
  var scope, element, ClientStatusService, directive;

  beforeEach(function () {
    scope = {
      watchedFnCallback: undefined,
      watchers: {},
      $watch: function (valueToWatch, callback) {
        scope.watchedFnCallback = callback;
      },
      change: function (newValue) {
        scope.watchedFnCallback(newValue);
      }
    };
    element = {
      addClass: sinon.spy(),
      removeClass: sinon.spy()
    };
    ClientStatusService = { currentStatus: "" };
    var ReadyToDownloadDirective = require("./ready_to_download_directive");
    directive = new ReadyToDownloadDirective(ClientStatusService);
  });

  it("must disable the element if the status is not ready", function () {
    directive.link(scope, element);
    expect(element.addClass).to.have.been.calledWith("disabled");
  });

  it("must enable the element if the status is ready", function () {
    ClientStatusService.currentStatus = "ready";
    directive.link(scope, element);
    expect(element.removeClass).to.have.been.calledWith("disabled");
  });

  it("must allow to download when the client is ready", function () {
    directive.link(scope, element);
    scope.change("ready");
    expect(element.removeClass).to.have.been.calledWith("disabled");
  });

  it("must prevent downloads when the client crashes", function () {
    directive.link(scope, element);
    scope.change("error");
    expect(element.addClass).to.have.been.calledWith("disabled");
  });
});
"use strict";

module.exports = ReadyToDownloadDirective;

function ReadyToDownloadDirective(ClientStatusService) {
  function link(scope, element) {
    if (ClientStatusService.currentStatus === "ready") {
      element.removeClass("disabled");
    } else {
      element.addClass("disabled");
    }

    scope.$watch(
      function () {
        return ClientStatusService.currentStatus;
      },
      function (currentState, lastState) {
        if (currentState === lastState) {
          return;
        }

        if (currentState === "ready") {
          element.removeClass("disabled");
        } else {
          element.addClass("disabled");
        }
      }
    );
  }

  return {
    restrict: "A",
    scope: {},
    link: link
  };
}
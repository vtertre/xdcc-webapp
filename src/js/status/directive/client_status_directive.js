"use strict";

module.exports = ClientStateDirective;

/* @ngInject */
function ClientStateDirective(socket, ClientStatusService) {
  function link(scope, element) {
    socket.on("xdcc:clientConnected", handleClientConnected);
    socket.on("xdcc:clientError", handleClientError);

    scope.$on("$destroy", function () {
      socket.removeListener("xdcc:clientConnected", handleClientConnected);
      socket.removeListener("xdcc:clientError", handleClientError);
    });

    function handleClientConnected() {
      ClientStatusService.currentStatus = "ready";
      element.css("color", "#5cb85c");
    }

    function handleClientError() {
      ClientStatusService.currentStatus = "error";
      element.css("color", "#d9534f");
    }
  }

  return {
    restrict: "A",
    scope: {},
    link: link
  };
}
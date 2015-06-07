"use strict";

module.exports = ClientStateDirective;

/* @ngInject */
function ClientStateDirective(socket) {
  function link(scope, element) {
    socket.on("xdcc:clientConnected", setMarkerGreen);
    socket.on("xdcc:clientError", setMarkerRed);

    scope.$on("$destroy", function () {
      socket.removeListener("xdcc:clientConnected", setMarkerGreen);
      socket.removeListener("xdcc:clientError", setMarkerRed);
    });

    function setMarkerGreen() {
      element.css("color", "#5cb85c");
    }

    function setMarkerRed() {
      element.css("color", "#d9534f");
    }
  }

  return {
    restrict: "A",
    scope: {},
    link: link
  };
}
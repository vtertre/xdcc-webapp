"use strict";

module.exports = ClientStateDirective;

/* @ngInject */
function ClientStateDirective(socket) {
  function link(scope, element) {
    socket.on("xdcc:clientConnected", function () {
      element.css("color", "#5cb85c");
    });
    socket.on("xdcc:clientError", function () {
      element.css("color", "#d9534f");
    });
  }

  return {
    restrict: "A",
    link: link
  };
}
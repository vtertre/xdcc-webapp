"use strict";

module.exports = SocketFactory;

/* @ngInject */
function SocketFactory(socketFactory) {
  return socketFactory();
}
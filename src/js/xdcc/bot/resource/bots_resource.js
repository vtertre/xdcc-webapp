"use strict";

module.exports = Bots;

/* @ngInject */
function Bots($resource) {
  return $resource("/api/bot/:id", { id: "@id" }, {
    getAll: { method: "GET", isArray: true },
    get: { method: "GET", isArray: false }
  });
}
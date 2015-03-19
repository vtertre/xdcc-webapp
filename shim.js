module.exports = {
  "angular": {
    "exports": "angular",
    "depends": {jquery: "jQuery"}
  },
  "angular-resource": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngResource').name"
  },
  "angular-route": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('ngRoute').name"
  },
  "bootstrap": {
    "depends": {
      "jquery": "jQuery"
    }
  },
  "angular-bootstrap": {
    "depends": {
      "angular": "angular",
      "bootstrap": null
    },
    "exports": "angular.module('ui.bootstrap').name"
  },
  "angular-socket-io": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('btford.socket-io').name"
  },
  "angular-locker": {
    "depends": {
      "angular": "angular"
    },
    "exports": "angular.module('angular-locker').name"
  }
};
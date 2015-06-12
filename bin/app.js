"use strict";

var Server = require("../server/server");

function App() {
  this.run = function () {
    new Server().start();
  };
}

if (require.main === module) {
  new App().run();
}

module.exports = App;
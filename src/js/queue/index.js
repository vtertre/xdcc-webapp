"use strict";
module.exports = require("angular").module("queue", [require("../socket")])
  .controller("QueueController", require("./controller/queue_controller")).name;
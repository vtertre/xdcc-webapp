"use strict";
module.exports = require("angular").module("queue", [require("../socket")])
  .controller("QueueController", require("./controller/queue_controller")).name;

module.exports = require("angular").module("queue")
  .controller("QueueActionController", require("./controller/queue_action_controller")).name;
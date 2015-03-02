"use strict";
module.exports = require("angular").module("bot", [require("angular-resource"), require("../socket")])
  .controller("BotListController", require("./controller/bot_list_controller")).name;

module.exports = require("angular").module("bot")
  .controller("BotController", require("./controller/bot_controller")).name;

module.exports = require("angular").module("bot")
  .factory("Bots", require("./resource/bots_resource")).name;
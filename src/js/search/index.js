"use strict";
module.exports = require("angular").module("search", [require("angular-resource")])
  .controller("SearchController", require("./controller/search_controller"))
  .factory("Search", require("./resource/search_resource"))
  .name;
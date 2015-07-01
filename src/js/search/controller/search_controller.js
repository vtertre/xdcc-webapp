"use strict";

module.exports = SearchController;

/* @ngInject */
function SearchController($window, Search) {
  var it = this;
  it.loading = false;

  it.search = search;
  it.select = select;

  function search(query) {
    it.loading = true;
    return Search.search(query).then(function (data) {
      it.loading = false;
      return data;
    });
  }

  function select(bot) {
    $window.location.href = "#/bot/" + bot.id;
    it.selection = undefined;
  }
}
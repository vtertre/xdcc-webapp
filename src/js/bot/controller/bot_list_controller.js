"use strict";

module.exports = BotListController;

/* @ngInject */
function BotListController(bots, ORDER_OPTIONS) {
  this.bots = bots;
  this.orderOptions = ORDER_OPTIONS;
  this.sortOrder = ORDER_OPTIONS.ascending;
}
"use strict";

var _ = require("underscore");

var store = {
  getClient: getClient,
  storeClient: storeClient,
  purgeClient: purgeClient,
  setInactive: setInactive,
  refreshAccess: refreshAccess
};

module.exports = store;

// 50 minutes timeout
var timeoutLimit = 3000000;
setInterval(cleanUpTimedOutUsers, timeoutLimit / 2);

var userIdToIrcClientMap = {};
var userIdToInactiveValueMap = {};
var userIdToLastAccessTimeMap = {};

function getClient(userId) {
  return userIdToIrcClientMap[userId];
}

function storeClient(userId, client) {
  userIdToIrcClientMap[userId] = client;
}

function purgeClient(userId) {
  if (userIdToIrcClientMap[userId]) {
    userIdToIrcClientMap[userId].disconnect();
    delete userIdToIrcClientMap[userId];
  }
}

function setInactive(userId) {
  userIdToInactiveValueMap[userId] = true;
}

function setActive(userId) {
  userIdToInactiveValueMap[userId] = false;
}

function refreshAccess(userId) {
  var time = new Date();
  userIdToLastAccessTimeMap[userId] = time.getTime();
  setActive(userId);
}

// Inspired from from https://github.com/redwire/aIRChat
function cleanUpTimedOutUsers() {
  var keys = Object.keys(userIdToLastAccessTimeMap);
  var now = (new Date()).getTime();
  _.each(keys, function (userId) {
    var lastAccessTime = userIdToLastAccessTimeMap[userId];
    if ((now - lastAccessTime > timeoutLimit) && userIdToInactiveValueMap[userId]) {
      // TODO *** Check that no request is in progress
      cleanUpUser(userId);
    }
  });
}

function cleanUpUser(userId) {
  purgeClient(userId);
  delete userIdToInactiveValueMap[userId];
  delete userIdToLastAccessTimeMap[userId];
}


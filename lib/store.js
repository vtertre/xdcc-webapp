// Maps a user ID to an IRC client
var clientStore = {};

// Maps a user ID to a bool which is true when the user has logged in but his last socket is disconnected
var inactive = {};

// Maps a user ID to a time of last access
var accessTimes = {};

function getClient(userId) {
  return clientStore[userId];
}

function storeClient(userId, client) {
  clientStore[userId] = client;
}

function removeClient(userId) {
  delete clientStore[userId];
}

function setInactive(userId) {
  inactive[userId] = true;
}

function setActive(userId) {
  inactive[userId] = false;
}

function refreshAccess(userId) {
  var time = new Date();
  accessTimes[userId] = time.getTime();
}

var store = {
  getClient: getClient,
  storeClient: storeClient,
  removeClient: removeClient,
  setInactive: setInactive,
  setActive: setActive,
  refreshAccess: refreshAccess
};

module.exports = store;

// 50 minutes timeout
var timeout = 3000000;

// Inspired from from https://github.com/redwire/aIRChat
setInterval(
  function () {
    var disconnectedCounter = 0;
    var keys = Object.keys(accessTimes);
    var now = (new Date()).getTime();
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i];
      var time = accessTimes[key];
      if (now - time > timeout && inactive[key]) {
        // TODO *** Check that no request is in progress
        clientStore[key].disconnect();
        delete clientStore[key];
        delete inactive[key];
        delete accessTimes[time];
        ++disconnectedCounter;
      }
    }
    console.log("Number or inactive clients disconnected: " + disconnectedCounter);
  },
  timeout / 2
);


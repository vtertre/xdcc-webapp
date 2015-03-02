var clientStore = {};

var getClient = function (id) {
  return clientStore[id];
};

var storeClient = function (id, client) {
  clientStore[id] = client;
};

var removeClient = function (id) {
  delete clientStore[id];
};

var store = {
  getClient: getClient,
  storeClient: storeClient,
  removeClient: removeClient
};

module.exports = store;


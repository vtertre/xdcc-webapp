var irc = require("./irc");
var store = require("./store");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    var client;

    socket.on("connect-client", function (id) {
      client = new irc.Client("irc.otaku-irc.fr", id, { debug: true });
      store.storeClient(id, client);

      client.on("complete", function (packInfo) {
        socket.emit("complete", packInfo);
      });

      client.on("dlerror", function (error, packInfo) {
        socket.emit("dlerror", error, packInfo);
      });

      client.on("connect", function () {
        socket.on("disconnect", function () {
          client.disconnect();
          store.removeClient("bobby");
        });
      });
    });

    // TODO *** Errors
  });
};
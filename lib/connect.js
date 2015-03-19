var irc = require("./irc");
var store = require("./store");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    var client;

    socket.on("userLoggedIn", function (userId, userLogin) {
      socket.userId = userId;

      client = createIrcClient(userLogin);
      store.refreshAccess(socket.userId);
      store.storeClient(socket.userId, client);

      client.on("complete", completeHandler);
      client.on("dlerror", dlErrorHandler);
    });

    socket.on("disconnect", function () {
      store.setInactive(socket.userId);
      delete socket.userId;

      if (client) {
        client.removeAllListeners("complete");
        client.removeAllListeners("dlerror");
      }
    });

    socket.on("restoreSession", function (userId, userLogin) {
      socket.userId = userId;

      client = store.getClient(userId);
      if (!client) {
        client = createIrcClient(userLogin);
        store.storeClient(socket.userId, client);
      }

      store.refreshAccess(socket.userId);

      client.on("complete", completeHandler);
      client.on("dlerror", dlErrorHandler);
    });

    socket.on("userLoggedOut", function (userId) {
      client.disconnect();
      store.removeClient(userId);
    });

    function createIrcClient(userLogin) {
      return new irc.Client(
        "irc.otaku-irc.fr",
        "xdccwa_" + userLogin,
        {
          debug: true
        }
      );
    }

    function completeHandler(packInfo) {
      socket.emit("complete", packInfo);
    }

    function dlErrorHandler(error, packInfo) {
      socket.emit("dlerror", error, packInfo);
    }
  });
};
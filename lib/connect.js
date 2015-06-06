"use strict";

var irc = require("./node-irc/irc");
var store = require("./store");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    var client;

    socket.on("userLoggedIn", function (userId, userLogin) {
      socket.userId = userId;

      client = createIrcClient(userLogin);
      store.refreshAccess(socket.userId);
      store.storeClient(socket.userId, client);

      addClientHandlers();
    });

    socket.on("disconnect", function () {
      store.setInactive(socket.userId);
      delete socket.userId;

      if (client) {
        removeClientHandlers();
      }
    });

    socket.on("restoreSession", function (userId, userLogin) {
      socket.userId = userId;

      client = store.getClient(userId);
      if (!client) {
        client = createIrcClient(userLogin);
        store.storeClient(socket.userId, client);
      } else {
        socket.emit("xdcc:clientConnected");
      }

      store.refreshAccess(socket.userId);

      addClientHandlers();
    });

    socket.on("userLoggedOut", function (userId) {
      store.purgeClient(userId);
    });

    function createIrcClient(userLogin) {
      return new irc.Client(
        "irc.otaku-irc.fr",
        "xdccwa_" + userLogin,
        {
          channels: ["#serial_us"],
          debug: false
        }
      );
    }

    function addClientHandlers() {
      client
        .on("join#serial_us", function () {
          socket.emit("xdcc:clientConnected");
        })
        .on("connectionError", function () {
          socket.emit("xdcc:clientError");
        })
        .on("xdcc:complete", function (packInfo) {
          socket.emit("xdcc:complete", packInfo);
        })
        .on("xdcc:canceled", function (packInfo) {
          socket.emit("xdcc:canceled", packInfo);
        })
        .on("xdcc:dlerror", function (error, packInfo) {
          socket.emit("xdcc:dlerror", error, packInfo);
        });
    }

    function removeClientHandlers() {
      client.removeAllListeners("join#serial_us");
      client.removeAllListeners("connectionError");
      client.removeAllListeners("xdcc:complete");
      client.removeAllListeners("xdcc:canceled");
      client.removeAllListeners("xdcc:dlerror");
    }
  });
};
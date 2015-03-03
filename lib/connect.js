var irc = require("./irc");
var store = require("./store");

module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    var client;

    socket.on("createSession", function () {
      var sessionId = generateUUID();
      client = new irc.Client("irc.otaku-irc.fr", "xdccwa_" + sessionId, { debug: true });
      store.storeClient(sessionId, client);

      client.on("complete", function (packInfo) {
        socket.emit("complete", packInfo);
      });

      client.on("dlerror", function (error, packInfo) {
        socket.emit("dlerror", error, packInfo);
      });

      client.on("connect", function () {
        socket.on("disconnect", function () {
          client.disconnect();
          store.removeClient(sessionId);
        });

        socket.emit("sessionId", sessionId);
      });
    });

    // TODO *** Errors
  });
};

function generateUUID() {
  var d = new Date().getTime();
  return 'xx-4xxx-yxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
}
var store = require("../lib/store");
var RequestManager = require("piped-xdcc");

exports.download = function (request, response) {
  var botNickname = request.query.bn;
  var uuid = request.query.u;
  var packNumber = request.params.packId;

  var client = store.getClient(uuid);
  if (!botNickname || !client) {
    response.status(400).end();
    return;
  }

  var packOptions = {
    packNumber: packNumber,
    botNickname: botNickname
  };

  RequestManager.pipeXdccRequest(client, packOptions, function (error, connection) {
    if (error) {
      console.log(error);
      response.status(500).end();
      return;
    }
    connection
      .on("connect", function (packInfo) {
        response.set({
          "Content-Disposition": "attachment; filename=" + packInfo.filename,
          "Content-Length": String(packInfo.filesize)
        });
        response.on("close", function () {
          connection.cancel();
          client.emit("xdcc:canceled", packInfo);
        });

        this.pipe(response);
      })
      .on("complete", function (packInfo) {
        client.emit("xdcc:complete", packInfo);
      })
      .on("dlerror", function (error, packInfo) {
        response.end();
        client.emit("xdcc:dlerror", error, packInfo);
      });
  });

  store.refreshAccess(uuid);
};
var store = require("../lib/store");
var requestManager = require("../lib/request_manager");

exports.download = function (request, response) {
  var botName = request.query.bn;
  var uuid = request.query.u;
  var packId = request.params.packId;

  var client = store.getClient(uuid);
  if (!botName || !client) {
    response.status(400).end();
    return;
  }

  var packOpts = {
    pack: "#" + packId,
    nick: botName,
    resume: false,
    progressInterval: 10
  };

  var packRequest = new requestManager.Request(client, packOpts);
  packRequest.on("connect", function (packInfo) {
    response.set({
      'Content-Disposition': 'attachment; filename=' + packInfo.filename,
      'Content-Length': String(packInfo.filesize)
    });
  });

  packRequest.on("data", function (data) {
    response.write(data);
  });

  packRequest.on("complete", function (packInfo) {
    response.end();
    client.emit("complete", packInfo);
  });

  packRequest.on("dlerror", function (packInfo, error) {
    response.end();
    client.emit("dlerror", error, packInfo);
  });

  store.refreshAccess(uuid);
  packRequest.emit("start");
};
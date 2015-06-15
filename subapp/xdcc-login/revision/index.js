var mapToUse = {};

function revision(key) {
  return mapToUse[key] || key;
}

module.exports = {

  initMap: function (map) {
    mapToUse = map;
  },
  registerHelper: function (app) {
    app.locals.revision = revision;
  }
};
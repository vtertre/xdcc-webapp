"use strict";

module.exports = Subtitles;

/* @ngInject */
function Subtitles() {
  return {
    getDownloadUrl: function (packName, language) {
      return "/sub-api/download?l=" + language + "&q=" + encodeURIComponent(packName);
    }
  };
}
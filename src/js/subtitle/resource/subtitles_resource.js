"use strict";

module.exports = Subtitles;

/* @ngInject */
function Subtitles() {
  return {
    getDownloadUrl: function (packTitle, language) {
      return "/sub-api/download?l=" + language + "&q=" + encodeURIComponent(packTitle);
    }
  };
}
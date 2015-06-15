var i18n = require('i18next');

module.exports = function (app) {
  app.get("/", function (request, response) {
    response.render('index', {
      clazz: 'login',
      title: i18n.t("app.title.global")
    });
  });
};

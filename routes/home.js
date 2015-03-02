var i18n = require('i18next');

exports.index = function (request, response) {
  response.render('xdcc/index', {
    id: 'index',
    title: i18n.t("app.title.global")
  });
};

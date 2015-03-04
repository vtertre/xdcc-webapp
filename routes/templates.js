exports.serve = function (request, response) {
  response.render("templates/" + request.params[0]);
};
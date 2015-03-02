exports.serve = function (request, response) {
  response.render(request.params[0] + "/templates/" + request.params[1]);
};
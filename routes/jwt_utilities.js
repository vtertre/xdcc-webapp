module.exports = {
  config: {
    secret: process.env.JWT_SECRET,
    audience: "xdcc-express-server",
    issuer: "xdcc-api",
    getToken: getToken
  }
};

function getToken(req) {
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return null;
  }

  var splitHeader = authorizationHeader.split(' ');
  var title = splitHeader[0];
  if (title !== "Basic") {
    return null;
  }

  return splitHeader[1];
}
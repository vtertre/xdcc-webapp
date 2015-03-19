module.exports = {
  config: {
    secret: process.env.JWT_SECRET,
    audience: "xdcc:express-server",
    issuer: "xdcc:sessions",
    getToken: getTokenFromQueryString
  }
};

function getTokenFromQueryString(req) {
  var query = req.query;
  if (!query) {
    return null;
  }

  return query.t;
}
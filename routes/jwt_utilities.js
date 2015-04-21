module.exports = {
  config: {
    secret: process.env.XDCC_WEBAPP_JWT_SECRET,
    audience: "xdcc:app",
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
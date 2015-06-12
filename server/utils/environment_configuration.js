"use strict";

var config = require("12factor-config");

module.exports = config({
  serverPort: {
    env: "PORT",
    type: "integer",
    default: 5000
  },
  apiUrl: {
    env: "XDCC_WEBAPP_API_URL",
    type: "string",
    default: "http://localhost:8089"
  },
  sessionsUrl: {
    env: "XDCC_WEBAPP_SESSIONS_URL",
    type: "string",
    default: "http://localhost:8087"
  },
  subtitlesUrl: {
    env: "XDCC_WEBAPP_SUBTITLES_URL",
    type: "string",
    default: "http://localhost:8085"
  },
  loginAppPath: {
    env: "XDCC_WEBAPP_LOGIN_APP_PATH",
    type: "string",
    default: "../../xdcc-login/app"
  },
  jwtSecret: {
    env: "XDCC_WEBAPP_JWT_SECRET",
    type: "string",
    default: "development_secret"
  },
  revisionMapPath: {
    env: "XDCC_WEBAPP_REVISION_MAP_PATH",
    type: "string",
    default: "../public/default_map.json"
  }
});
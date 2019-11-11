//
// Application configuration
//
"use strict";

// Set the logging level.
const loglevel = process.env.LOGLEVEL || "trace";
const secretkey = process.env.SECRETKEY || "someverysecretdummykey";

module.exports = {
  secretkey: secretkey,

  webPort: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT || "",
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbDatabase: process.env.DB_DATABASE || "users",

  logger: require("tracer").console({
    format: ["{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}"],
    preprocess: function(data) {
      data.title = data.title.toUpperCase();
    },
    dateformat: "isoUtcDateTime",
    level: loglevel
  })
};

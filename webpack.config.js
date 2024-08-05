const path = require("path");

module.exports = {
  entry: "./Script Embeds/index.js", // Entry point of your application
  output: {
    filename: "allScripts.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production", // Ensures the output is optimized for production
};

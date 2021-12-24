const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    writeToDisk: true,
    contentBase: path.join(__dirname, "./dist"),
    port: 9000,
  },
};

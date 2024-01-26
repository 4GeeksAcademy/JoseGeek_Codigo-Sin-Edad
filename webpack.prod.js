const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "public"), // Define la carpeta donde se colocarán los archivos
    filename: "bundle.js", // El nombre del archivo JavaScript principal
    publicPath: "/",
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true,
    }),
  ],
});

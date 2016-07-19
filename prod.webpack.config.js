var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("./webpack.isomorphictools.config.js")
);

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      components: path.join(__dirname, "src", "components"),
      config: path.join(__dirname, "src", "config"),
      utils: path.join(__dirname, "src", "utils"),
    }
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "index.js",
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"],
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!less"
        ),
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression("images"),
        loader: "url-loader?limit=153600",
      },
      // FONTS
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=/fonts/[hash].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&name=/fonts/[hash].[ext]"
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&name=/fonts/[hash].[ext]"
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      path.join("stylesheets", "[name].css"),
      {
        allChunks: true,
      }
    ),
  ],
};

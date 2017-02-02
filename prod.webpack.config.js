var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");

const PATHS = [
  "/",
];

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "components": path.join(__dirname, "src", "components"),
      "config": path.join(__dirname, "src", "config"),
      "utils": path.join(__dirname, "src", "utils"),
    },
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
          "css?importLoaders=2!autoprefixer-loader?browsers=last 2 versions!less?outputStyle=expanded&sourceMapContents=true"
        ),
      },
      // FONTS
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&publicPath=/fonts/&outputPath=fonts/"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&publicPath=/fonts/&outputPath=fonts/"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream&publicPath=/fonts/&outputPath=fonts/"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?publicPath=/fonts/&outputPath=fonts/"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml&publicPath=/fonts/&outputPath=fonts/"
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      path.join("stylesheets", "application.css"),
      {
        allChunks: true,
      }
    ),
    new StaticSiteGeneratorPlugin("main", PATHS, {
      stylesheets: [
        "stylesheets/application.css",
      ],
    }),
  ],
};

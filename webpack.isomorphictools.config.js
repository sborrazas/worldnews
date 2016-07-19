var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");

module.exports = {
  assets: {
    images: {
      extensions: [
        "jpeg",
        "jpg",
        "png",
        "gif",
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser,
    },
  },
};

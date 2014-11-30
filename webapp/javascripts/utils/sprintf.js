var Array = require("./window.js").Array;

module.exports = function (pattern) {
  var args = Array.prototype.slice.call(arguments, 1);

  return pattern.replace(/%(s)/g, function (_, replacementPattern) {
    return args.shift();
  });
};

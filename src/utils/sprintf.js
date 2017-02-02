export default (pattern, ...args) => {
  return pattern.replace(/%(s)/g, function (_, replacementPattern) {
    return args.shift();
  });
};

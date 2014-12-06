module.exports = function (element, eventName, listener) {
  element.addEventListener(eventName, listener, false);
};

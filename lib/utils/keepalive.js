'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.removeAlive = exports.getAlive = exports.keepAlive = void 0;

var keepAlive = function keepAlive(arr) {
  arr.forEach(function(item) {
    if (item) {
      window.localStorage.setItem(item.key, item.value);
    }
  });
};

exports.keepAlive = keepAlive;

var getAlive = function getAlive(arr) {
  // await arr[0].callback(JSON.parse(window.localStorage.getItem(arr[0].data)))
  // await arr[1].callback(JSON.parse(window.localStorage.getItem(arr[1].data)))
  arr.forEach(function(item, index) {
    if (item) {
      if (index === 0) {
        item.instance.setState(JSON.parse(window.localStorage.getItem(item.data)));
      } else {
        item.instance.props.form.setFieldsValue(JSON.parse(window.localStorage.getItem(item.data)));
      }
    }
  });
};

exports.getAlive = getAlive;

var removeAlive = function removeAlive(arr) {
  arr.forEach(function(item) {
    if (item) {
      window.localStorage.removeItem(item);
    }
  });
};

exports.removeAlive = removeAlive;

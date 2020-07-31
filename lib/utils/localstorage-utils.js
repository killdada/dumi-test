'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getItem = getItem;
exports.setItem = setItem;
exports.default = void 0;

var _isObject = _interopRequireDefault(require('underscore/isObject'));

var _isString = _interopRequireDefault(require('underscore/isString'));

var store = window.localStorage;

function get(key) {
  var value = store.getItem(key);

  if (value && (0, _isString.default)(value)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // do nothing
    }
  }

  return value;
}

function set(key, value) {
  if (value && (0, _isObject.default)(value)) {
    value = JSON.stringify(value);
  }

  store.setItem(key, value);
}

function getItem(key, defaultValue) {
  return get(key) || defaultValue;
}

function setItem(key, value) {
  return set(key, value);
}

var _default = {
  getItem: getItem,
  setItem: setItem
};
exports.default = _default;

'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.LocationHelper = void 0;

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _location = _interopRequireDefault(require('../constants/location'));

var _function = require('./function');

var Location = function Location() {
  var _this = this;

  (0, _classCallCheck2.default)(this, Location);

  this.parseType = function() {
    var type = (0, _function.queryString)('type');
    return (0, _function.isEmpty)(type) ? _location.default.TYPE_MENU_OPEN : Number(type);
  };

  this.isMenuOpen = function() {
    return _this.parseType() === _location.default.TYPE_MENU_OPEN;
  };

  this.isRefreshOpen = function() {
    return _this.parseType() === _location.default.TYPE_REFRESH_OPEN;
  };

  this.setCurrentHash = function(hash) {
    var defaultHash = window.location.hash;
    hash = hash || defaultHash;
    sessionStorage.setItem(_location.default.CURRENT_HASH, encodeURIComponent(hash));
  };

  this.getCurrentHash = function() {
    var hash = sessionStorage.getItem(_location.default.CURRENT_HASH);
    return hash ? decodeURIComponent(hash) : '';
  };
};

var LocationHelper = new Location();
exports.LocationHelper = LocationHelper;

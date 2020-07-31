import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import LOCATION from '../constants/location';
import { queryString, isEmpty } from './function';

var Location = function Location() {
  var _this = this;

  _classCallCheck(this, Location);

  this.parseType = function() {
    var type = queryString('type');
    return isEmpty(type) ? LOCATION.TYPE_MENU_OPEN : Number(type);
  };

  this.isMenuOpen = function() {
    return _this.parseType() === LOCATION.TYPE_MENU_OPEN;
  };

  this.isRefreshOpen = function() {
    return _this.parseType() === LOCATION.TYPE_REFRESH_OPEN;
  };

  this.setCurrentHash = function(hash) {
    var defaultHash = window.location.hash;
    hash = hash || defaultHash;
    sessionStorage.setItem(LOCATION.CURRENT_HASH, encodeURIComponent(hash));
  };

  this.getCurrentHash = function() {
    var hash = sessionStorage.getItem(LOCATION.CURRENT_HASH);
    return hash ? decodeURIComponent(hash) : '';
  };
};

export var LocationHelper = new Location();

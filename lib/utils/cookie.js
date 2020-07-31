'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getCookieByKey = void 0;

/** 键名获取cookie
 *
 * @param {*} key
 */
var getCookieByKey = function getCookieByKey(key) {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; ');

    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');

      if (arr2[0] === key) {
        var value = arr2[1];
        return value;
      }
    }
  }
};

exports.getCookieByKey = getCookieByKey;

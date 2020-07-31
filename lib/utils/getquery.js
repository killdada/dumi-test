'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.xss = xss;
exports.getQuery = getQuery;

/**
 * 过滤XSS
 * @param str 需要过滤的内容
 * @returns {string} 显示的内容
 */
function xss(str) {
  var div = document.createElement('div');
  var text = document.createTextNode(str);
  var val = '';
  div.appendChild(text);
  val = div.innerHTML;
  return val;
}
/**
 * 获取url或者自定义字符串中的参数
 * @param name 不传name则直接返回整个参数对象
 * @param queryStr 自定义字符串
 * @param unxss 不进行参数XSS安全过滤
 * @param undecode 不进行自动解码
 * @returns {*} 获取到的参数值或者由所有参数组成完整对象
 */

function getQuery() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var queryStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var unxss = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var undecode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var searchArr = location.href.split('?');
  var str = queryStr || searchArr[1];
  if (!str) return name ? undefined : {};
  var tempArr;
  var temp;
  var obj = {};
  var arr = str.split('&');
  var len = arr.length;

  for (var i = 0; i < len; i++) {
    try {
      tempArr = arr[i].split('=');

      if (tempArr.length === 2) {
        temp = undecode ? tempArr[1] : decodeURIComponent(tempArr[1]);
        obj[tempArr[0]] = unxss ? temp : xss(temp);
      }
    } catch (e) {
      //
    }
  }

  return name ? obj[name] : obj;
}

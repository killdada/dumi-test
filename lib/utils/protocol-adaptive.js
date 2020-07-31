'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;
var rProtocol = /^http(s)?:/i;
var protocol = location.protocol;
/**
 * url自适应
 * @param url 传入url，替换协议为自适应，遇到非http(s)协议，自动拼接[rollbackProtocol]
 * @param rollbackProtocol 传入rollback protocol非http(s)默认使用https，如需更改，传入期望值
 * @returns {string}
 */

function protocolAdaptive() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var rollbackProtocol =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https:';
  var targetProtocol = rProtocol.test(protocol) ? '' : rollbackProtocol;

  if (rProtocol.test(url)) {
    return url.replace(rProtocol, targetProtocol);
  }

  return ''.concat(targetProtocol).concat(url);
}

var _default = protocolAdaptive;
exports.default = _default;

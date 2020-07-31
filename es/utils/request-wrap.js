import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';

/**
 * 封装promise请求方法
 *
 * @export
 * @param {Object} options
 * @param {function} options.api - 请求接口方法
 * @param {string} [options.defaultMsg = "请求失败"] - 请求失败或出错时的message提示
 * @returns {function}
 */
export default function requestWrap(_ref) {
  var api = _ref.api,
    _ref$defaultMsg = _ref.defaultMsg,
    defaultMsg = _ref$defaultMsg === void 0 ? '请求失败' : _ref$defaultMsg;

  var message = require('antd/lib/message').default;

  if (!api) {
    console.error('RequestWrapper Error: invaild Api option.', api);
    return function() {
      return null;
    };
  }

  return /*#__PURE__*/ (function() {
    var _ref2 = _asyncToGenerator(
      /*#__PURE__*/ _regeneratorRuntime.mark(function _callee(req) {
        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return api(req)
                  .then(function(res) {
                    return res || true;
                  })
                  .catch(function(err) {
                    console.error('RequestWrapper Error [Api Error]: ', err, '\n', api);
                    message.error(''.concat(err.msg) || ''.concat(err.message) || defaultMsg);
                    return null;
                  });

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      })
    );

    return function(_x) {
      return _ref2.apply(this, arguments);
    };
  })();
}

'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isNumber = isNumber;
exports.disabledDate = disabledDate;
exports.formatFileName = formatFileName;
exports.isNumberAndletter = isNumberAndletter;
exports.redirect = redirect;
exports.goback = goback;
exports.obj2key = obj2key;
exports.uniqeByKeys = uniqeByKeys;
exports.handleDownload = handleDownload;
exports.incrementalArray = incrementalArray;
exports.numberNegative = numberNegative;
exports.fileName = fileName;
exports.filterRequestArgs = filterRequestArgs;
exports.deepClone = deepClone;
exports.formatTimeNew = formatTimeNew;
exports.debounce = debounce;
exports.checkMobile = checkMobile;
exports.convertProgressStatus = convertProgressStatus;
exports.convertProgressText = convertProgressText;
exports.getUrlParameter = getUrlParameter;
exports.formatPublicFileName = formatPublicFileName;
exports.queryString = exports.isEmpty = void 0;

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);

var _underscore = _interopRequireDefault(require('underscore'));

var _moment = _interopRequireDefault(require('moment'));

/**
 * 检测对象是否为空
 * null、undefined、'' 为 true
 * 空对象{}、空数组[], NaN 为 true
 * @param {any} target
 */
var isEmpty = function isEmpty(target) {
  if (target === null || target === '') {
    return true;
  }

  var targetString = Object.prototype.toString.call(target).split(' ')[1];
  var type = targetString.substring(0, targetString.length - 1);

  switch (type) {
    case 'Object':
      return Object.keys(target).length === 0;

    case 'Array':
      return target.length === 0;

    case 'Number':
      return isNaN(target);

    default:
      return false;
  }
};
/**
 * 获取 url 参数
 */

exports.isEmpty = isEmpty;

var queryString = function queryString(key) {
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  var _window$location = window.location,
    search = _window$location.search,
    hash = _window$location.hash;
  var r = null;

  if (search) {
    r = search.substring(1).match(reg);
  } else if (hash) {
    r = hash.split('?')[1] ? hash.split('?')[1].match(reg) : null;
  }

  if (r) {
    var value = decodeURIComponent(r[2]);
    return value.endsWith('/') ? value.substring(0, value.length - 1) : value;
  }

  return null;
};

exports.queryString = queryString;

function isNumber(value) {
  var reg = /^[0-9]*$/;

  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}

function disabledDate(str) {
  return str;
}

function formatFileName(str) {
  return str.substring(str.lastIndexOf('/') + 15);
}

function isNumberAndletter(value) {
  var reg = /^[A-Za-z0-9]+$/;

  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}

function redirect() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var hashReg = /^#w+/;

  if (hashReg.test(location)) {
    window.location.hash = location;
    return;
  }

  window.location.href = location;
}

function goback() {
  window.history.back();
}

function obj2key(obj, keys) {
  var n = keys.length;
  var key = [];

  while (n--) {
    key.push(obj[keys[n]]);
  }

  return key.join('|');
}

function uniqeByKeys(array, keys) {
  var arr = [];
  var hash = {};

  for (var i = 0, j = array.length; i < j; i++) {
    var k = obj2key(array[i], keys);

    if (!(k in hash)) {
      hash[k] = true;
      arr.push(array[i]);
    }
  }

  return arr;
}

function handleDownload(url) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '文件名';
  var data = arguments.length > 2 ? arguments[2] : undefined;
  console.log(url);
  var param = JSON.stringify(data);
  var queryUrl = ''
    .concat(url, '/?param=')
    .concat(param, '&title=')
    .concat(title);
  window.open(queryUrl);
}

function incrementalArray(length) {
  return Array.from({
    length: length
  }).map(function(v, k) {
    return k;
  });
}

function numberNegative(n) {
  return n === '0' ? '0' : '-'.concat(n);
}

function fileName(str) {
  if (str.substring(str.lastIndexOf('/') + 1).length < 15) {
    return str.substring(str.lastIndexOf('/') + 1);
  } else {
    return str.substring(str.lastIndexOf('/') + 15);
  }
}
/**
 * 过滤空参、null、undefined、NaN，不过滤 0
 */

function filterRequestArgs(args) {
  return _underscore.default.omit(args, function(value) {
    return !value && value !== 0;
  });
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function formatTimeNew(timeArray) {
  var showTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!timeArray || timeArray.length === 0) return [undefined, undefined];
  var beginTime;
  var endTime;

  if (showTime) {
    beginTime = timeArray[0].format('YYYY-MM-DD HH:mm:ss');
    endTime = timeArray[1].format('YYYY-MM-DD HH:mm:ss');
  } else {
    beginTime = timeArray[0].format('YYYY-MM-DD') + ' 00:00:00';
    endTime = timeArray[1].format('YYYY-MM-DD') + ' 23:59:59';
  }

  return [(0, _moment.default)(beginTime).unix(), (0, _moment.default)(endTime).unix()];
} // 防抖

function debounce(fn) {
  var timeout = null;
  return function() {
    var _arguments = arguments,
      _this = this;

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      fn.apply(_this, _arguments);
    }, 500);
  };
}

function checkMobile(value) {
  return /^1(2|3|4|5|6|7|8|9)\d{9}$/.test(value);
}

function convertProgressStatus(value) {
  switch (value) {
    case 0:
      return 'active';

    case 1:
      return 'success';

    case 2:
      return 'exception';

    default:
      return '';
  }
}

function convertProgressText(value) {
  switch (value) {
    case 0:
      return '下载中';

    case 1:
      return '下载成功';

    case 2:
      return '下载异常，请联系管理员';

    default:
      return '';
  }
}

function getUrlParameter(parameter) {
  var location =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  var search = location.search;
  var parameterMap = new Map();
  search
    .substr(1)
    .split('&')
    .forEach(function(v) {
      var a = v.split('=');
      parameterMap.set.apply(parameterMap, (0, _toConsumableArray2.default)(a));
    });
  return parameterMap.get(''.concat(parameter));
}

function formatPublicFileName(str) {
  return str.substring(str.lastIndexOf('/') + 15);
}

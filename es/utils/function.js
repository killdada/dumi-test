import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _ from 'underscore';
import moment from 'moment';
/**
 * 检测对象是否为空
 * null、undefined、'' 为 true
 * 空对象{}、空数组[], NaN 为 true
 * @param {any} target
 */

export var isEmpty = function isEmpty(target) {
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

export var queryString = function queryString(key) {
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
export function isNumber(value) {
  var reg = /^[0-9]*$/;

  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}
export function disabledDate(str) {
  return str;
}
export function formatFileName(str) {
  return str.substring(str.lastIndexOf('/') + 15);
}
export function isNumberAndletter(value) {
  var reg = /^[A-Za-z0-9]+$/;

  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}
export function redirect() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
  var hashReg = /^#w+/;

  if (hashReg.test(location)) {
    window.location.hash = location;
    return;
  }

  window.location.href = location;
}
export function goback() {
  window.history.back();
}
export function obj2key(obj, keys) {
  var n = keys.length;
  var key = [];

  while (n--) {
    key.push(obj[keys[n]]);
  }

  return key.join('|');
}
export function uniqeByKeys(array, keys) {
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
export function handleDownload(url) {
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
export function incrementalArray(length) {
  return Array.from({
    length: length
  }).map(function(v, k) {
    return k;
  });
}
export function numberNegative(n) {
  return n === '0' ? '0' : '-'.concat(n);
}
export function fileName(str) {
  if (str.substring(str.lastIndexOf('/') + 1).length < 15) {
    return str.substring(str.lastIndexOf('/') + 1);
  } else {
    return str.substring(str.lastIndexOf('/') + 15);
  }
}
/**
 * 过滤空参、null、undefined、NaN，不过滤 0
 */

export function filterRequestArgs(args) {
  return _.omit(args, function(value) {
    return !value && value !== 0;
  });
}
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export function formatTimeNew(timeArray) {
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

  return [moment(beginTime).unix(), moment(endTime).unix()];
} // 防抖

export function debounce(fn) {
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
export function checkMobile(value) {
  return /^1(2|3|4|5|6|7|8|9)\d{9}$/.test(value);
}
export function convertProgressStatus(value) {
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
export function convertProgressText(value) {
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
export function getUrlParameter(parameter) {
  var location =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location;
  var search = location.search;
  var parameterMap = new Map();
  search
    .substr(1)
    .split('&')
    .forEach(function(v) {
      var a = v.split('=');
      parameterMap.set.apply(parameterMap, _toConsumableArray(a));
    });
  return parameterMap.get(''.concat(parameter));
}
export function formatPublicFileName(str) {
  return str.substring(str.lastIndexOf('/') + 15);
}

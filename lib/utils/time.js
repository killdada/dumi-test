'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.convertTimeToFormat = convertTimeToFormat;
exports.formatTime = formatTime;
exports.isSettlementDate = isSettlementDate;
exports.timestampToMoment = timestampToMoment;
exports.timeToDay = timeToDay;
exports.timeToMinute = timeToMinute;
exports.timeToDayNoStuff = timeToDayNoStuff;

var _moment = _interopRequireDefault(require('moment'));

/**
 * Format unix timestamp to format string.
 *
 * @export
 * @param {*} timestamp
 * @param {string} [format="YYYY-MM-DD HH:mm"]
 * @returns
 */
function convertTimeToFormat(timestamp) {
  var format =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MM-DD HH:mm';
  // If timestamp is 0, means time does not exist.
  var time = new Date(timestamp * 1000);
  var momentTime = timestamp || timestamp < 0 ? (0, _moment.default)(time).format(format) : '';
  return momentTime;
}

function formatTime(formData) {
  var time = formData.time;
  var startTime = time[0].format('YYYY-MM-DD') + ' 00:00:00';
  var endTime = time[1].format('YYYY-MM-DD') + ' 23:59:59';
  return [(0, _moment.default)(startTime).unix(), (0, _moment.default)(endTime).unix()];
}

function isSettlementDate(start, end) {
  // 如果提现的起止时间都是0，不限制提现时间，任何一天都可以提现。
  if (start === 0 && end === 0) return true;
  var startStr;
  var endStr;

  if (String(start).length <= 1) {
    startStr = '0' + start;
  } else {
    endStr = String(start);
  }

  if (String(end).length <= 1) {
    endStr = '0' + end;
  } else {
    endStr = String(end);
  }

  var timeStrStart = ''
    .concat((0, _moment.default)().format('YYYY-MM'), '-')
    .concat(startStr, ' 00:00:00');
  var timeStrEnd = ''
    .concat((0, _moment.default)().format('YYYY-MM'), '-')
    .concat(endStr, ' 23: 59: 59');
  return (0, _moment.default)().isBetween(timeStrStart, timeStrEnd);
}

function timestampToMoment(timestamp) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'YYYY-MMM-DD';
  return timestamp ? (0, _moment.default)(new Date(timestamp)) : '';
}

function timeToDay(value) {
  var time = value && value > 0 ? _moment.default.unix(value).format('YYYY-MM-DD') : '';
  return time;
}

function timeToMinute(value) {
  var time = value && value > 0 ? _moment.default.unix(value).format('YYYY-MM-DD HH:mm') : '';
  return time;
}

function timeToDayNoStuff(value) {
  return _moment.default.unix(value).format('YYYYMMDD');
}

'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require('axios'));

var _nprogress = _interopRequireDefault(require('nprogress'));

var _underscore = _interopRequireDefault(require('underscore'));

var _function = require('./function');

var NETWORK_ERROR_MESSAGE = '网络异常';
var SERVER_ERROR_MESSAGE = '系统异常';
var UNEXPETED_STATUS = -1;
var UNLOGIN_STATUS = 1000;
var SUCCESS_STATUS = 0;
var EMPTY_LIST = 6003;
var COMMON_STATUS = 10000;

var api = _axios.default.create({
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: '/',
  timeout: 1000 * 60 * 5,
  transformResponse: [
    function(data) {
      _nprogress.default.done();

      if (data) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          // alert('服务器异常,请重试!');
        }
      }

      return data;
    }
  ]
});

api.interceptors.response.use(
  function(response) {
    var status =
      typeof response.data.status !== 'undefined' ? response.data.status : UNEXPETED_STATUS;

    if (typeof status !== 'number' || (status !== SUCCESS_STATUS && status !== EMPTY_LIST)) {
      if (status === UNLOGIN_STATUS) {
        if (confirm('登录信息已失效，请重新登录')) {
          return (0, _function.redirect)();
        }
      }

      if (status < COMMON_STATUS) {
        // alert(response.data.msg || SERVER_ERROR_MESSAGE);
      }

      var newData = _underscore.default.defaults({}, response.data, {
        msg: SERVER_ERROR_MESSAGE,
        status: UNEXPETED_STATUS
      });

      return Promise.reject(newData);
    }

    return response.data || {};
  },
  function() {
    return Promise.reject({
      msg: NETWORK_ERROR_MESSAGE,
      status: UNEXPETED_STATUS
    });
  }
);
var _default = api;
exports.default = _default;

'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

require('antd/es/modal/style');

var _modal = _interopRequireDefault(require('antd/es/modal'));

var _axios = _interopRequireDefault(require('axios'));

var _underscore = _interopRequireDefault(require('underscore'));

var _nprogress = _interopRequireDefault(require('nprogress'));

var _function = require('./function');

var UserService = {}; // import UserService from '../../service/user/user';

var NETWORK_ERROR_MESSAGE = '网络异常';
var SERVER_ERROR_MESSAGE = '系统异常';
var UNEXPETED_STATUS = -1;
var UNLOGIN_STATUS = 101002;
var SUCCESS_STATUS = 0;
var ENTY_STATUS = 6003;
var RESET_STATUS = 6008;

var api = _axios.default.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 1000 * 60 * 15,
  transformRequest: [
    function(data) {
      _nprogress.default.start();

      if (!data) {
        return '';
      }

      return JSON.stringify(data);
    }
  ],
  transformResponse: [
    function(data) {
      _nprogress.default.done();

      if (data) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          // 当返回blob时,不应报错
          // message.error('系统异常,请重试!');
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

    if (status === UNLOGIN_STATUS && !_underscore.default.isEmpty(window.USER)) {
      var data = {
        id: parseInt(window.USER.userId, 10),
        logoutType: 1,
        logouIp: '127.0.0.1',
        uuid: window.USER.uuid
      };
      UserService.signout(data).then(
        function() {
          _modal.default.error({
            title: '登录信息已失效，请重新登录',
            okText: '确定',
            onOk: function onOk() {
              (0, _function.redirect)('/login');
            }
          }); // 清空存储的session值

          window.USER = {};
        },
        function(error) {
          (0, _function.redirect)('/login');
          throw error;
        }
      );
      response.data.status = 0;
    }

    if (status !== SUCCESS_STATUS && status !== ENTY_STATUS && status !== RESET_STATUS) {
      // 导出时status !== 0 要排除
      var dataType = Object.prototype.toString.call(response.data); // 1.data === null,2,data为数据流------如果为blob,一定没有status和data属性

      if (response.data.data !== undefined) {
        // data为null
        _message2.default.error(response.data.msg || SERVER_ERROR_MESSAGE);

        return Promise.reject((0, _objectSpread2.default)({}, response.data));
      }

      if (dataType === '[object Blob]') {
        // 不要覆盖,谢谢
        // console.log(dataType)
        return response;
      }

      _message2.default.error(response.data.msg || SERVER_ERROR_MESSAGE);

      var newData = _underscore.default.defaults({}, response.data, {
        msg: SERVER_ERROR_MESSAGE,
        status: UNEXPETED_STATUS
      });

      return Promise.reject(newData);
    }

    return (
      response.data || {
        status: UNEXPETED_STATUS,
        msg: 'data为空'
      }
    );
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

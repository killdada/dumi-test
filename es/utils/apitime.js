import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';
import axios from 'axios';
import _ from 'underscore';
import { redirect } from './function';
var UserService = {};
var NETWORK_ERROR_MESSAGE = '网络异常'; // const SERVER_ERROR_MESSAGE = '系统异常';

var UNEXPETED_STATUS = -1;
var UNLOGIN_STATUS = 101002; // const SUCCESS_STATUS = 0;

function apiFun(time) {
  var api = axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 1000 * time,
    transformRequest: [
      function(data) {
        if (!data) {
          return '';
        }

        return JSON.stringify(data);
      }
    ],
    transformResponse: [
      function(data) {
        if (data) {
          try {
            data = JSON.parse(data);
          } catch (e) {
            alert('服务器异常,请重试!');
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

      if (status === UNLOGIN_STATUS && !_.isEmpty(window.USER)) {
        var data = {
          id: parseInt(window.USER.userId, 10),
          logoutType: 1,
          logouIp: '127.0.0.1',
          uuid: window.USER.uuid
        };
        UserService.signout(data).then(
          function() {
            _Modal.error({
              title: '登录信息已失效，请重新登录',
              okText: '确定',
              onOk: function onOk() {
                redirect('/login');
              }
            }); // 清空存储的session值

            window.USER = {};
          },
          function(error) {
            redirect('/login');
            throw error;
          }
        );
        response.data.status = 0;
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
  return api;
}

export default apiFun;

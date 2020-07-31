'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require('axios'));

var response = function response(_response, cb, filename) {
  var type = _response.headers['content-type'];

  if (type && type.indexOf('application/json') >= 0) {
    var reader = new FileReader();
    reader.readAsText(_response.data, 'utf-8');

    reader.onload = function() {
      cb(JSON.parse(reader.result));
    };

    return false;
  } else {
    cb({
      status: 0
    });
  }

  var blob = new Blob([_response.data]); // 处理文档流

  var elink = document.createElement('a');
  elink.download = _response.headers['content-disposition']
    ? decodeURIComponent(_response.headers['content-disposition'].split('filename=')[1])
    : filename
    ? filename
    : 'text';
  elink.style.display = 'none';
  elink.href = window.URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  window.URL.revokeObjectURL(elink.href); // 释放URL 对象

  document.body.removeChild(elink);
};

var download = function download(url, data, cb, filename) {
  if (data) {
    _axios.default
      .post(url, data, {
        responseType: 'blob'
      })
      .then(function(res) {
        response(res, cb, filename);
      });
  } else {
    _axios.default
      .get(url, {
        responseType: 'blob'
      })
      .then(function(res) {
        response(res, cb, filename);
      });
  }
};

var _default = download;
exports.default = _default;

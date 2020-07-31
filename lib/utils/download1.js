'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require('axios'));

var download = function download(url, data, cb) {
  _axios.default
    .post(url, data, {
      responseType: 'blob'
    })
    .then(function(response) {
      var type = response.headers['content-type'];

      if (type && type.indexOf('application/json') >= 0) {
        var reader = new FileReader();
        reader.readAsText(response.data, 'utf-8');

        reader.onload = function() {
          data = JSON.parse(reader.result);
          cb(data);
        };

        return false;
      }

      var blob = new Blob([response.data]); // 处理文档流

      var elink = document.createElement('a');
      elink.download = response.headers['content-disposition']
        ? decodeURIComponent(response.headers['content-disposition'].split('filename=')[1])
        : 'text';
      elink.style.display = 'none';
      elink.href = window.URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      window.URL.revokeObjectURL(elink.href); // 释放URL 对象

      document.body.removeChild(elink);
    });
};

var _default = download;
exports.default = _default;

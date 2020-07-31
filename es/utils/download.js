import axios from 'axios';

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
    axios
      .post(url, data, {
        responseType: 'blob'
      })
      .then(function(res) {
        response(res, cb, filename);
      });
  } else {
    axios
      .get(url, {
        responseType: 'blob'
      })
      .then(function(res) {
        response(res, cb, filename);
      });
  }
};

export default download;

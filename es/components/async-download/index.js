import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';
import 'antd/es/icon/style';
import _Icon from 'antd/es/icon';
import 'antd/es/spin/style';
import _Spin from 'antd/es/spin';
import 'antd/es/message/style';
import _message from 'antd/es/message';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import React from 'react';
import moment from 'moment';
import { handleDownload, convertProgressText } from '../../utils/index.js'; // import Service from '../../mng/service/common/common.js';

import './index.css';
var Service = {};
var ONE_MIN = 60000;
var CANCEL_PROGRESS = -1;

var AsyncDownload = /*#__PURE__*/ (function(_React$Component) {
  _inherits(AsyncDownload, _React$Component);

  var _super = _createSuper(AsyncDownload);

  function AsyncDownload(props) {
    var _this;

    _classCallCheck(this, AsyncDownload);

    _this = _super.call(this, props);
    _this.state = {
      fileName: props.fileName,
      progressStatus: 0,
      progressTime: 0,
      visible: false,
      isProgressSlow: false,
      hasCancelProgress: false
    };
    _this.getProgress = undefined;
    return _this;
  }

  _createClass(AsyncDownload, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.props.onRef('AsyncDownload', this);
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState(function(preState) {
          if (preState.fileName !== nextProps.fileName) {
            return {
              fileName: nextProps.fileName
            };
          }
        });
      }
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearInterval(this.getProgress);
      }
    },
    {
      key: 'startExportProgress',
      value: function startExportProgress(exportToken) {
        var self = this;
        self.getExportProgress(exportToken);
        clearInterval(this.getProgress);
        self.setState({
          visible: true,
          progressTime: 0,
          isProgressSlow: false
        });
        this.getProgress = setInterval(function() {
          var time = self.state.progressTime + 3000;
          var isProgressSlow = false;

          if (time > ONE_MIN) {
            isProgressSlow = true;
          }

          self.setState({
            progressTime: time,
            isProgressSlow: isProgressSlow
          });
          self.getExportProgress(exportToken);
        }, 3000);
      }
    },
    {
      key: 'getExportProgress',
      value: function getExportProgress(exportToken) {
        var self = this;
        Service.getExportProgress(exportToken)
          .then(function(res) {
            if (res.progressStatus !== 0 && !self.state.hasCancelProgress) {
              self.cleanProgress(res.progressStatus, exportToken);
            }

            self.setState({
              progressStatus: res.progressStatus
            });
          })
          .catch(function(e) {
            console.error('getExportProgress error:', e);
            self.cleanProgress(2, null);
            return _message.error(e.msg || '获取下载进度失败');
          });
      }
    },
    {
      key: 'cleanProgress',
      value: function cleanProgress(status, exportToken) {
        clearInterval(this.getProgress);
        var self = this;
        var CLOSE_TIME = status !== 2 ? 1000 : 2000;
        this.setState({
          hasCancelProgress: status === CANCEL_PROGRESS,
          progressTime: 0,
          isProgressSlow: false
        });
        setTimeout(function() {
          self.setState({
            visible: false,
            progressStatus: 0
          });
        }, CLOSE_TIME);

        if (status === 1) {
          // download let date =
          moment().format('YYYYMMDDHHmmss'); // eslint-disable-next-line no-undef

          handleDownload(
            '/api/download/public/export-data', // eslint-disable-next-line no-undef
            ''.concat(this.state.fileName).concat(date),
            {
              exportToken: exportToken
            }
          );
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        var visible = this.state.visible;

        if (visible) {
          return /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'sms-modal-view'
            },
            /*#__PURE__*/ React.createElement(
              _Modal,
              {
                visible: visible,
                width: 450,
                maskClosable: false,
                wrapClassName: 'progress-modal',
                footer: null
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'progress'
                },
                this.state.progressStatus === 0
                  ? /*#__PURE__*/ React.createElement(_Spin, {
                      size: 'large'
                    })
                  : this.state.progressStatus === 1
                  ? /*#__PURE__*/ React.createElement(_Icon, {
                      type: 'check-circle',
                      theme: 'filled',
                      style: {
                        fontSize: '45px',
                        color: '#52c41a'
                      }
                    })
                  : /*#__PURE__*/ React.createElement(_Icon, {
                      type: 'close-circle',
                      theme: 'filled',
                      style: {
                        fontSize: '45px',
                        color: '#f5222d'
                      }
                    }),
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'progress-text'
                  },
                  convertProgressText(this.state.progressStatus),
                  /*#__PURE__*/ React.createElement('br', null),
                  this.state.isProgressSlow ? '数据量较大，请您耐心等待。' : ''
                )
              )
            )
          );
        } else {
          return null;
        }
      }
    }
  ]);

  return AsyncDownload;
})(React.Component);

export default AsyncDownload;

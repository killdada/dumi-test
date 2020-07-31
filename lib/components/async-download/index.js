'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/modal/style');

var _modal = _interopRequireDefault(require('antd/es/modal'));

require('antd/es/icon/style');

var _icon = _interopRequireDefault(require('antd/es/icon'));

require('antd/es/spin/style');

var _spin = _interopRequireDefault(require('antd/es/spin'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

var _moment = _interopRequireDefault(require('moment'));

var _index = require('../../utils/index.js');

require('./index.css');

// import Service from '../../mng/service/common/common.js';
var Service = {};
var ONE_MIN = 60000;
var CANCEL_PROGRESS = -1;

var AsyncDownload = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(AsyncDownload, _React$Component);

  var _super = (0, _createSuper2.default)(AsyncDownload);

  function AsyncDownload(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AsyncDownload);
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

  (0, _createClass2.default)(AsyncDownload, [
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
            return _message2.default.error(e.msg || '获取下载进度失败');
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
          (0, _moment.default)().format('YYYYMMDDHHmmss'); // eslint-disable-next-line no-undef

          (0, _index.handleDownload)(
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
          return /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'sms-modal-view'
            },
            /*#__PURE__*/ _react.default.createElement(
              _modal.default,
              {
                visible: visible,
                width: 450,
                maskClosable: false,
                wrapClassName: 'progress-modal',
                footer: null
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'progress'
                },
                this.state.progressStatus === 0
                  ? /*#__PURE__*/ _react.default.createElement(_spin.default, {
                      size: 'large'
                    })
                  : this.state.progressStatus === 1
                  ? /*#__PURE__*/ _react.default.createElement(_icon.default, {
                      type: 'check-circle',
                      theme: 'filled',
                      style: {
                        fontSize: '45px',
                        color: '#52c41a'
                      }
                    })
                  : /*#__PURE__*/ _react.default.createElement(_icon.default, {
                      type: 'close-circle',
                      theme: 'filled',
                      style: {
                        fontSize: '45px',
                        color: '#f5222d'
                      }
                    }),
                /*#__PURE__*/ _react.default.createElement(
                  'div',
                  {
                    className: 'progress-text'
                  },
                  (0, _index.convertProgressText)(this.state.progressStatus),
                  /*#__PURE__*/ _react.default.createElement('br', null),
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
})(_react.default.Component);

var _default = AsyncDownload;
exports.default = _default;

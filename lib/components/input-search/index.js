'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/row/style');

var _row = _interopRequireDefault(require('antd/es/row'));

require('antd/es/button/style');

var _button = _interopRequireDefault(require('antd/es/button'));

require('antd/es/input/style');

var _input = _interopRequireDefault(require('antd/es/input'));

require('antd/es/icon/style');

var _icon = _interopRequireDefault(require('antd/es/icon'));

require('antd/es/col/style');

var _col = _interopRequireDefault(require('antd/es/col'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
);

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

require('antd/es/date-picker/style');

var _datePicker = _interopRequireDefault(require('antd/es/date-picker'));

var _react = _interopRequireDefault(require('react'));

var _function = require('@/utils/function');

require('./index.css');

// eslint-disable-next-line no-unused-vars
var RangePicker = _datePicker.default.RangePicker;

var App = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(App, _React$Component);

  var _super = (0, _createSuper2.default)(App);

  function App(props) {
    var _this;

    (0, _classCallCheck2.default)(this, App);
    _this = _super.call(this, props);
    _this.state = {
      input: _this.props.defaultValue,
      period: null
    };
    _this.onInputChange = _this.onInputChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSearch = _this.onSearch.bind((0, _assertThisInitialized2.default)(_this));
    _this.onPeriodChange = _this.onPeriodChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.emitEmpty = _this.emitEmpty.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(App, [
    {
      key: 'onSearch',
      value: function onSearch() {
        this.props.onSearch(this.state.input, this.state.period);
      }
    },
    {
      key: 'onInputChange',
      value: function onInputChange(e) {
        this.setState({
          input: e.target.value
        });
      }
    },
    {
      key: 'emitEmpty',
      value: function emitEmpty() {
        this.setState({
          input: ''
        });
      }
    },
    {
      key: 'onPeriodChange',
      value: function onPeriodChange(date) {
        this.setState({
          period: {
            startTime: date[0].hour(0).minutes(0),
            endTime: date[1].hour(23).minutes(59)
          }
        });
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          label = _this$props.label,
          hadTimeFilter = _this$props.hadTimeFilter;
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'search-tab'
          },
          /*#__PURE__*/ _react.default.createElement(
            _row.default,
            {
              gutter: 6
            },
            /*#__PURE__*/ _react.default.createElement(
              _col.default,
              {
                span: 2
              },
              /*#__PURE__*/ _react.default.createElement(
                'span',
                {
                  className: 'label-text'
                },
                label,
                '\uFF1A'
              )
            ),
            /*#__PURE__*/ _react.default.createElement(
              _col.default,
              {
                span: 6
              },
              /*#__PURE__*/ _react.default.createElement(_input.default, {
                value: this.state.input,
                onChange: this.onInputChange,
                suffix: this.state.input
                  ? /*#__PURE__*/ _react.default.createElement(_icon.default, {
                      type: 'close-circle',
                      onClick: this.emitEmpty
                    })
                  : null
              })
            ),
            /*#__PURE__*/ _react.default.createElement(
              _col.default,
              {
                span: 1
              },
              /*#__PURE__*/ _react.default.createElement(_button.default, {
                shape: 'circle',
                icon: 'search',
                onClick: this.onSearch
              })
            )
          ),
          hadTimeFilter
            ? /*#__PURE__*/ _react.default.createElement(
                _row.default,
                {
                  gutter: 6
                },
                /*#__PURE__*/ _react.default.createElement(
                  _col.default,
                  {
                    span: 2
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    'span',
                    {
                      className: 'label-text'
                    },
                    '\u652F\u4ED8\u65F6\u95F4\uFF1A'
                  )
                ),
                /*#__PURE__*/ _react.default.createElement(
                  _col.default,
                  {
                    span: 6
                  },
                  /*#__PURE__*/ _react.default.createElement(RangePicker, {
                    disabledDate: _function.disabledDate,
                    onChange: this.onPeriodChange
                  })
                )
              )
            : null
        );
      }
    }
  ]);
  return App;
})(_react.default.Component);

App.propTypes = {
  onSearch: _react.default.PropTypes.func
};
App.defaultProps = {
  laebl: '',
  defaultValue: '',
  hadTimeFilter: false
};
var _default = App;
exports.default = _default;

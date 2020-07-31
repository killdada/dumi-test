'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/input/style');

var _input = _interopRequireDefault(require('antd/es/input'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

require('./index.css');

var TimeZoneInput = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(TimeZoneInput, _React$Component);

  var _super = (0, _createSuper2.default)(TimeZoneInput);

  function TimeZoneInput(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimeZoneInput);
    _this = _super.call(this, props);

    _this.handleEarliestTimeChange = function(e) {
      var latestTime = _this.state.latestTime;
      var earliestTime = parseInt(e.target.value || 0, 10);

      if (isNaN(earliestTime)) {
        return;
      }

      _this.setState({
        earliestTime: earliestTime,
        latestTime: latestTime
      });

      _this.triggerChange({
        earliestTime: earliestTime,
        latestTime: latestTime
      });
    };

    _this.handleLatestTimeChange = function(e) {
      var earliestTime = _this.state.earliestTime;
      var latestTime = parseInt(e.target.value || 0, 10);

      if (isNaN(latestTime)) {
        return;
      }

      _this.setState({
        earliestTime: earliestTime,
        latestTime: latestTime
      });

      _this.triggerChange({
        earliestTime: earliestTime,
        latestTime: latestTime
      });
    };

    _this.triggerChange = function(changedValue) {
      // Should provide an event to pass value to Form.
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(
          (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _this.state), changedValue)
        );
      }
    };

    var value = props.value || {};
    _this.state = {
      earliestTime: value.earliestTime,
      latestTime: value.latestTime
    };
    return _this;
  }

  (0, _createClass2.default)(TimeZoneInput, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _ref = this.state.value || {},
          earliestTime = _ref.earliestTime,
          latestTime = _ref.latestTime;

        this.setState({
          earliestTime: earliestTime,
          latestTime: latestTime
        });
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _ref2 = nextProps.value || {},
          earliestTime = _ref2.earliestTime,
          latestTime = _ref2.latestTime;

        this.setState({
          earliestTime: earliestTime,
          latestTime: latestTime
        });
      }
    },
    {
      key: 'render',
      value: function render() {
        var state = this.state;
        return /*#__PURE__*/ _react.default.createElement(
          'span',
          {
            className: 'timezone-wrap'
          },
          /*#__PURE__*/ _react.default.createElement(
            _input.default.Group,
            {
              compact: true
            },
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              value: state.earliestTime,
              onChange: this.handleEarliestTimeChange,
              className: 'time',
              placeholder: '\u53EF\u9884\u7EA6\u65F6\u9650\u8D77'
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              className: 'dash',
              placeholder: '-',
              disabled: true
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              value: state.latestTime,
              onChange: this.handleLatestTimeChange,
              className: 'time noborder',
              placeholder: '\u53EF\u9884\u7EA6\u65F6\u9650\u6B62'
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              className: 'text',
              placeholder: '\u5C0F\u65F6',
              disabled: true
            })
          )
        );
      }
    }
  ]);
  return TimeZoneInput;
})(_react.default.Component);

var _default = TimeZoneInput;
exports.default = _default;

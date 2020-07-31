import 'antd/es/input/style';
import _Input from 'antd/es/input';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import React from 'react';
import './index.css';

var TimeZoneInput = /*#__PURE__*/ (function(_React$Component) {
  _inherits(TimeZoneInput, _React$Component);

  var _super = _createSuper(TimeZoneInput);

  function TimeZoneInput(props) {
    var _this;

    _classCallCheck(this, TimeZoneInput);

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
        onChange(_objectSpread(_objectSpread({}, _this.state), changedValue));
      }
    };

    var value = props.value || {};
    _this.state = {
      earliestTime: value.earliestTime,
      latestTime: value.latestTime
    };
    return _this;
  }

  _createClass(TimeZoneInput, [
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
        return /*#__PURE__*/ React.createElement(
          'span',
          {
            className: 'timezone-wrap'
          },
          /*#__PURE__*/ React.createElement(
            _Input.Group,
            {
              compact: true
            },
            /*#__PURE__*/ React.createElement(_Input, {
              value: state.earliestTime,
              onChange: this.handleEarliestTimeChange,
              className: 'time',
              placeholder: '\u53EF\u9884\u7EA6\u65F6\u9650\u8D77'
            }),
            /*#__PURE__*/ React.createElement(_Input, {
              className: 'dash',
              placeholder: '-',
              disabled: true
            }),
            /*#__PURE__*/ React.createElement(_Input, {
              value: state.latestTime,
              onChange: this.handleLatestTimeChange,
              className: 'time noborder',
              placeholder: '\u53EF\u9884\u7EA6\u65F6\u9650\u6B62'
            }),
            /*#__PURE__*/ React.createElement(_Input, {
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
})(React.Component);

export default TimeZoneInput;

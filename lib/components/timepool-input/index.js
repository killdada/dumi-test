'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/input/style');

var _input = _interopRequireDefault(require('antd/es/input'));

require('antd/es/time-picker/style');

var _timePicker = _interopRequireDefault(require('antd/es/time-picker'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

var _moment = _interopRequireDefault(require('moment'));

require('./index.css');

var TimePoolInput = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(TimePoolInput, _React$Component);

  var _super = (0, _createSuper2.default)(TimePoolInput);

  function TimePoolInput(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimePoolInput);
    _this = _super.call(this, props);

    _this.handleMorningTimeChange = function(type, e) {
      var _this$state = _this.state,
        morningTime = _this$state.morningTime,
        afternoonTime = _this$state.afternoonTime;
      morningTime[type] = e;

      _this.setState({
        morningTime: morningTime,
        afternoonTime: afternoonTime
      });

      _this.triggerChange({
        morningTime: morningTime,
        afternoonTime: afternoonTime
      });
    };

    _this.handleAfternoonTimeChange = function(type, e) {
      var _this$state2 = _this.state,
        morningTime = _this$state2.morningTime,
        afternoonTime = _this$state2.afternoonTime;
      afternoonTime[type] = e;

      _this.setState({
        morningTime: morningTime,
        afternoonTime: afternoonTime
      });

      _this.triggerChange({
        morningTime: morningTime,
        afternoonTime: afternoonTime
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
    var disabled = props.disabled || false;
    _this.state = {
      disabled: disabled,
      morningTime: value.morningTime || {
        beginTime: undefined,
        endTime: undefined
      },
      afternoonTime: value.afternoonTime || {
        beginTime: undefined,
        endTime: undefined
      }
    };
    return _this;
  }

  (0, _createClass2.default)(TimePoolInput, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var value = this.state.value || {};
        var morningTime = value.morningTime || {
          beginTime: undefined,
          endTime: undefined
        };
        var afternoonTime = value.afternoonTime || {
          beginTime: undefined,
          endTime: undefined
        };
        this.setState({
          morningTime: morningTime,
          afternoonTime: afternoonTime
        });
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var value = nextProps.value || {};
        var disabled = nextProps.disabled || false;
        var morningTime = value.morningTime || {
          beginTime: undefined,
          endTime: undefined
        };
        var afternoonTime = value.afternoonTime || {
          beginTime: undefined,
          endTime: undefined
        };
        this.setState({
          morningTime: morningTime,
          afternoonTime: afternoonTime,
          disabled: disabled
        });
      }
    },
    {
      key: 'range',
      value: function range(start, end) {
        var result = [];

        for (var i = start; i < end; i++) {
          result.push(i);
        }

        return result;
      }
    },
    {
      key: 'disabledHours',
      value: function disabledHours(type) {
        switch (type) {
          case 'morning':
            return this.range(13, 24);

          case 'afternoon':
            return this.range(0, 12);
        }
      }
    },
    {
      key: 'disabledMinutes',
      value: function disabledMinutes(selectedHour) {
        if (selectedHour === 12) {
          return; // eslint-disable-next-line no-unreachable

          this.range(1, 60);
        }
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var state = this.state;
        return /*#__PURE__*/ _react.default.createElement(
          'span',
          {
            className: 'timepool-wrap'
          },
          /*#__PURE__*/ _react.default.createElement(
            _input.default.Group,
            {
              compact: true,
              className: 'input-group'
            },
            /*#__PURE__*/ _react.default.createElement(_timePicker.default, {
              disabled: state.disabled,
              defaultOpenValue: (0, _moment.default)('00:00', 'HH:mm'),
              value: state.morningTime.beginTime,
              onChange: this.handleMorningTimeChange.bind(this, 'beginTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('morning');
              },
              suffixIcon: '',
              className: 'time'
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              className: 'dash',
              placeholder: '-',
              disabled: true
            }),
            /*#__PURE__*/ _react.default.createElement(_timePicker.default, {
              disabled: state.disabled,
              defaultOpenValue: (0, _moment.default)('12:00', 'HH:mm'),
              value: state.morningTime.endTime,
              onChange: this.handleMorningTimeChange.bind(this, 'endTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('morning');
              },
              disabledMinutes: function disabledMinutes(selectedHour) {
                return _this2.disabledMinutes(selectedHour);
              },
              suffixIcon: '',
              className: 'noborder time'
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              className: 'text',
              placeholder: '/\u4E0A\u5348',
              disabled: true
            })
          ),
          /*#__PURE__*/ _react.default.createElement(
            'span',
            {
              className: 'wave'
            },
            '~'
          ),
          /*#__PURE__*/ _react.default.createElement(
            _input.default.Group,
            {
              compact: true,
              className: 'input-group'
            },
            /*#__PURE__*/ _react.default.createElement(_timePicker.default, {
              disabled: state.disabled,
              defaultOpenValue: (0, _moment.default)('12:00', 'HH:mm'),
              value: state.afternoonTime.beginTime,
              onChange: this.handleAfternoonTimeChange.bind(this, 'beginTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('afternoon');
              },
              suffixIcon: '',
              className: 'time'
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              className: 'dash',
              placeholder: '-',
              disabled: true
            }),
            /*#__PURE__*/ _react.default.createElement(_timePicker.default, {
              disabled: state.disabled,
              defaultOpenValue: (0, _moment.default)('23:59', 'HH:mm'),
              value: state.afternoonTime.endTime,
              onChange: this.handleAfternoonTimeChange.bind(this, 'endTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('afternoon');
              },
              suffixIcon: '',
              className: 'noborder time'
            }),
            /*#__PURE__*/ _react.default.createElement(_input.default, {
              className: 'text',
              placeholder: '/\u4E0B\u5348',
              disabled: true
            })
          )
        );
      }
    }
  ]);
  return TimePoolInput;
})(_react.default.Component);

var _default = TimePoolInput;
exports.default = _default;

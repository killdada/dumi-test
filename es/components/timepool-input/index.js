import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/time-picker/style';
import _TimePicker from 'antd/es/time-picker';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import React from 'react';
import moment from 'moment';
import './index.css';

var TimePoolInput = /*#__PURE__*/ (function(_React$Component) {
  _inherits(TimePoolInput, _React$Component);

  var _super = _createSuper(TimePoolInput);

  function TimePoolInput(props) {
    var _this;

    _classCallCheck(this, TimePoolInput);

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
        onChange(_objectSpread(_objectSpread({}, _this.state), changedValue));
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

  _createClass(TimePoolInput, [
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
        return /*#__PURE__*/ React.createElement(
          'span',
          {
            className: 'timepool-wrap'
          },
          /*#__PURE__*/ React.createElement(
            _Input.Group,
            {
              compact: true,
              className: 'input-group'
            },
            /*#__PURE__*/ React.createElement(_TimePicker, {
              disabled: state.disabled,
              defaultOpenValue: moment('00:00', 'HH:mm'),
              value: state.morningTime.beginTime,
              onChange: this.handleMorningTimeChange.bind(this, 'beginTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('morning');
              },
              suffixIcon: '',
              className: 'time'
            }),
            /*#__PURE__*/ React.createElement(_Input, {
              className: 'dash',
              placeholder: '-',
              disabled: true
            }),
            /*#__PURE__*/ React.createElement(_TimePicker, {
              disabled: state.disabled,
              defaultOpenValue: moment('12:00', 'HH:mm'),
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
            /*#__PURE__*/ React.createElement(_Input, {
              className: 'text',
              placeholder: '/\u4E0A\u5348',
              disabled: true
            })
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'wave'
            },
            '~'
          ),
          /*#__PURE__*/ React.createElement(
            _Input.Group,
            {
              compact: true,
              className: 'input-group'
            },
            /*#__PURE__*/ React.createElement(_TimePicker, {
              disabled: state.disabled,
              defaultOpenValue: moment('12:00', 'HH:mm'),
              value: state.afternoonTime.beginTime,
              onChange: this.handleAfternoonTimeChange.bind(this, 'beginTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('afternoon');
              },
              suffixIcon: '',
              className: 'time'
            }),
            /*#__PURE__*/ React.createElement(_Input, {
              className: 'dash',
              placeholder: '-',
              disabled: true
            }),
            /*#__PURE__*/ React.createElement(_TimePicker, {
              disabled: state.disabled,
              defaultOpenValue: moment('23:59', 'HH:mm'),
              value: state.afternoonTime.endTime,
              onChange: this.handleAfternoonTimeChange.bind(this, 'endTime'),
              format: 'HH:mm',
              disabledHours: function disabledHours() {
                return _this2.disabledHours('afternoon');
              },
              suffixIcon: '',
              className: 'noborder time'
            }),
            /*#__PURE__*/ React.createElement(_Input, {
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
})(React.Component);

export default TimePoolInput;

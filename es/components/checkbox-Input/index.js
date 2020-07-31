import 'antd/es/row/style';
import _Row from 'antd/es/row';
import 'antd/es/col/style';
import _Col from 'antd/es/col';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/input-number/style';
import _InputNumber from 'antd/es/input-number';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import _ from 'underscore';
import React from 'react';
import './index.css';

var CheckBoxandInput = /*#__PURE__*/ (function(_React$Component) {
  _inherits(CheckBoxandInput, _React$Component);

  var _super = _createSuper(CheckBoxandInput);

  function CheckBoxandInput(props) {
    var _this;

    _classCallCheck(this, CheckBoxandInput);

    _this = _super.call(this, props);

    _this.onChangeCheckBox = function(rangeValue) {
      var options = _this.state.options;

      _this.setState(
        {
          rangeValue: rangeValue,
          indeterminate: !!rangeValue.length && rangeValue.length < options.length,
          checkAll: rangeValue.length === options.length,
          checkAllDeliveryFee: undefined
        },
        function() {
          _this.formatFormValue();
        }
      );
    };

    _this.onChangeCheckAll = function(e) {
      var plainOptions = _this.state.plainOptions;

      _this.setState(
        {
          rangeValue: e.target.checked ? plainOptions : [],
          indeterminate: false,
          checkAll: e.target.checked
        },
        function() {
          _this.formatFormValue();
        }
      );
    };

    _this.onChangeItemInput = function(index, e) {
      var deliveryFee = _this.state.deliveryFee;
      deliveryFee[index] = e;

      _this.setState(
        {
          deliveryFee: deliveryFee,
          checkAllDeliveryFee: _this.getCheckAllDeliveryFee(deliveryFee)
        },
        function() {
          if (_.isNumber(e)) {
            _this.formatFormValue();
          }
        }
      );
    };

    _this.onChangeCheckAllInput = function(e) {
      var options = _this.state.options;
      var deliveryFee = []; // eslint-disable-next-line no-unused-vars,guard-for-in

      for (var n in options) {
        deliveryFee.push(e);
      }

      _this.setState(
        {
          checkAllDeliveryFee: e,
          deliveryFee: deliveryFee
        },
        function() {
          if (_.isNumber(e)) {
            _this.formatFormValue();
          }
        }
      );
    };

    _this.triggerChange = function(changedValue) {
      // Should provide an event to pass value to Form.
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(changedValue);
      }
    };

    var value = props.value || [];

    var _options = props.options || [];

    var disabled = props.disabled || false;
    var _plainOptions = [];

    _.map(_options, function(option) {
      _plainOptions.push(''.concat(option.value));
    });

    _this.state = {
      disabled: disabled,
      options: _options,
      value: value,
      plainOptions: _plainOptions,
      checkAll: false,
      indeterminate: false,
      rangeValue: [],
      deliveryFee: [],
      checkAllDeliveryFee: undefined
    };
    return _this;
  }

  _createClass(CheckBoxandInput, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var res = this.handleValue(this.state.value, this.state.options);
        this.setState(_objectSpread({}, res), function() {
          _this2.formatFormValue();
        });
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var value = nextProps.value,
          options = nextProps.options,
          disabled = nextProps.disabled;
        var preValue = this.props.value;
        var preOptions = this.props.options;
        var preDisabled = this.props.options;
        if (
          _.isEqual(preOptions, options) &&
          _.isEqual(preValue, value) &&
          _.isEqual(preDisabled, disabled)
        )
          return;
        var res = this.handleValue(value, options);
        var plainOptions = [];

        _.map(options, function(option) {
          plainOptions.push(''.concat(option.value));
        });

        this.setState(
          _objectSpread(
            _objectSpread({}, res),
            {},
            {
              disabled: disabled,
              value: value,
              plainOptions: plainOptions,
              options: options || []
            }
          )
        );
      }
    },
    {
      key: 'handleValue',
      value: function handleValue(data, options) {
        var rangeValueArr = [];
        var deliveryFeeArr = [];
        var checkAll = false; // eslint-disable-next-line no-unused-vars,guard-for-in

        for (var n in options) {
          deliveryFeeArr.push(0);
        }

        if (data && data.length) {
          checkAll = options.length === data.length;

          _.map(data, function(item) {
            var rangeValue = item.rangeValue,
              deliveryFee = item.deliveryFee;
            rangeValueArr.push(''.concat(rangeValue));

            for (var index = 0; index < options.length; index++) {
              var option = options[index];
              var value = option.value;
              if (rangeValue !== value) continue;
              deliveryFeeArr[index] = deliveryFee || 0;
            }
          });
        } else {
          checkAll = true;

          _.map(options, function(option) {
            rangeValueArr.push(''.concat(option.value));
          });
        }

        return {
          checkAll: checkAll,
          rangeValue: rangeValueArr,
          deliveryFee: deliveryFeeArr
        };
      }
    },
    {
      key: 'getCheckAllDeliveryFee',
      value: function getCheckAllDeliveryFee(deliveryFee) {
        var tmp = _.uniq(deliveryFee);

        return tmp.length === 1 ? deliveryFee[0] : undefined;
      }
    },
    {
      key: 'formatFormValue',
      value: function formatFormValue() {
        var _this$state = this.state,
          options = _this$state.options,
          plainOptions = _this$state.plainOptions;
        var _this$state2 = this.state,
          checkAll = _this$state2.checkAll,
          checkAllDeliveryFee = _this$state2.checkAllDeliveryFee,
          rangeValue = _this$state2.rangeValue,
          deliveryFee = _this$state2.deliveryFee;
        var changedValue = [];

        if (checkAll && !!checkAllDeliveryFee) {
          _.map(options, function(option) {
            var value = option.value;
            var tmp = {
              rangeType: 1,
              // 按行政区选择区域
              rangeValue: ''.concat(value),
              isFreeDelivery: deliveryFee[0] ? 0 : 1,
              deliveryFee: deliveryFee[0]
            };
            changedValue.push(tmp);
          });
        } else {
          if (rangeValue && rangeValue.length) {
            _.map(rangeValue, function(range) {
              var index = plainOptions.indexOf(range);
              var fee = deliveryFee[index];
              var tmp = {
                rangeType: 1,
                // 按行政区选择区域
                rangeValue: ''.concat(range),
                isFreeDelivery: fee ? 0 : 1,
                deliveryFee: fee
              };
              changedValue.push(tmp);
            });
          }
        }

        this.triggerChange(changedValue);
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _this$state3 = this.state,
          disabled = _this$state3.disabled,
          indeterminate = _this$state3.indeterminate,
          checkAll = _this$state3.checkAll,
          checkAllDeliveryFee = _this$state3.checkAllDeliveryFee,
          rangeValue = _this$state3.rangeValue,
          options = _this$state3.options,
          deliveryFee = _this$state3.deliveryFee;
        return /*#__PURE__*/ React.createElement(
          'span',
          {
            className: 'checkBox-input-wrap'
          },
          /*#__PURE__*/ React.createElement(
            _Checkbox,
            {
              indeterminate: indeterminate,
              onChange: this.onChangeCheckAll,
              checked: checkAll,
              className: 'd-checkbox-wrap',
              style: {
                marginBottom: 10
              },
              disabled: disabled
            },
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'checkbox-label'
              },
              '\u5168\u9009'
            ),
            /*#__PURE__*/ React.createElement(_InputNumber, {
              disabled: disabled,
              size: 'small',
              min: 0,
              precision: 2,
              className: 'checkbox-input',
              value: checkAllDeliveryFee,
              onChange: this.onChangeCheckAllInput
            })
          ),
          /*#__PURE__*/ React.createElement(
            _Checkbox.Group,
            {
              style: {
                width: '100%'
              },
              value: rangeValue,
              onChange: this.onChangeCheckBox,
              disabled: disabled
            },
            /*#__PURE__*/ React.createElement(
              _Row,
              null,
              _.map(options, function(item, index) {
                var isChecked = rangeValue.includes(''.concat(item.value));
                var value = deliveryFee[index];
                return /*#__PURE__*/ React.createElement(
                  _Col,
                  {
                    span: 8,
                    key: ''.concat(index, '-option')
                  },
                  /*#__PURE__*/ React.createElement(
                    _Checkbox,
                    {
                      value: ''.concat(item.value),
                      className: 'd-checkbox-wrap'
                    },
                    /*#__PURE__*/ React.createElement(
                      'span',
                      {
                        className: 'checkbox-label'
                      },
                      item.label
                    ),
                    /*#__PURE__*/ React.createElement(_InputNumber, {
                      size: 'small',
                      min: 0,
                      precision: 2,
                      className: 'checkbox-input',
                      disabled: disabled || !isChecked,
                      value: value,
                      onChange: _this3.onChangeItemInput.bind(_this3, index)
                    })
                  )
                );
              })
            )
          )
        );
      }
    }
  ]);

  return CheckBoxandInput;
})(React.Component);

export default CheckBoxandInput;

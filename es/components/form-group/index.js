import 'antd/es/row/style';
import _Row from 'antd/es/row';
import 'antd/es/col/style';
import _Col from 'antd/es/col';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import 'antd/es/message/style';
import _message from 'antd/es/message';
import 'antd/es/tree-select/style';
import _TreeSelect from 'antd/es/tree-select';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import _typeof from '@babel/runtime/helpers/esm/typeof';
import 'antd/es/select/style';
import _Select from 'antd/es/select';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import 'antd/es/form/style';
import _Form from 'antd/es/form';

var _dec, _class, _class2, _temp;

import React from 'react';
import PropTypes from 'prop-types';
import './style/index.css'; // eslint-disable-next-line no-unused-vars

var FormItem = _Form.Item;
var FormGroup =
  ((_dec = _Form.create()),
  _dec(
    (_class =
      ((_temp = _class2 = /*#__PURE__*/ (function(_React$Component) {
        _inherits(FormGroup, _React$Component);

        var _super = _createSuper(FormGroup);

        function FormGroup(props) {
          var _this;

          _classCallCheck(this, FormGroup);

          _this = _super.call(this, props);
          _this.state = {};
          return _this;
        }

        _createClass(FormGroup, [
          {
            key: 'createOptions',
            value: function createOptions(selectOptions) {
              var Options = null; // 区分数组或者对象

              if (!selectOptions) {
                console.error('请传入selectOptions字段,类型为数组或对象');
                return;
              }

              if (Array.isArray(selectOptions)) {
                Options = selectOptions.map(function(val) {
                  var value = val.value !== undefined && val.value !== null ? val.value : val.id;
                  var name =
                    val.shortName !== undefined && val.shortName !== null
                      ? val.shortName
                      : val.name;
                  return /*#__PURE__*/ React.createElement(
                    _Select.Option,
                    {
                      key: value,
                      value: value
                    },
                    val.label || name
                  );
                });
              }

              return Options;
            }
          },
          {
            key: 'renderControl',
            value: function renderControl(val, index) {
              var _val$controlType = val.controlType,
                controlType = _val$controlType === void 0 ? 1 : _val$controlType,
                _val$selectOptions = val.selectOptions,
                selectOptions = _val$selectOptions === void 0 ? [] : _val$selectOptions,
                _val$controlProps = val.controlProps,
                controlProps = _val$controlProps === void 0 ? {} : _val$controlProps;
              var ControlType = controlType;
              var Options = null;

              if (typeof ControlType === 'function') {
                // 处理Selcect等情况
                if (ControlType.name === 'Select') {
                  Options = this.createOptions(selectOptions);
                  return /*#__PURE__*/ React.createElement(_Select, controlProps, Options);
                }

                return /*#__PURE__*/ React.createElement(ControlType, controlProps);
              } else if (_typeof(controlType) === 'object') {
                return ControlType;
              } else {
                if (ControlType === 1) {
                  return /*#__PURE__*/ React.createElement(_Input, controlProps);
                } else if (ControlType === 2) {
                  Options = this.createOptions(selectOptions);
                  return /*#__PURE__*/ React.createElement(_Select, controlProps, Options);
                } else if (ControlType === 3) {
                  return /*#__PURE__*/ React.createElement(_TreeSelect, controlProps);
                }
              }
            }
          },
          {
            key: 'render',
            value: function render() {
              var _this2 = this;

              var getFieldDecorator = this.props.form.getFieldDecorator; // const formItemLayout = {
              //   labelCol: {
              //     xs: { span: 24 },
              //     sm: { span: 10 },
              //     lg: { span: 4 }
              //   },
              //   wrapperCol: {
              //     xs: { span: 24 },
              //     sm: { span: 14 },
              //     lg: { span: 20 }
              //   }
              // };

              var formType = this.props.formType;
              if (!formType) return _message.error('请传入formType');
              var formItems = formType.map(function(val, index) {
                var _val$fieldDecorator = val.fieldDecorator,
                  fieldDecorator = _val$fieldDecorator === void 0 ? {} : _val$fieldDecorator;
                return (
                  /*#__PURE__*/
                  // <Col style={{ paddingLeft: 32, paddingRight: 32 }} xs={24} sm={24} md={12} lg={8} key={index}>
                  // <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={index}>
                  React.createElement(
                    _Col,
                    {
                      xs: 24,
                      sm: 12,
                      md: 8,
                      key: index
                    },
                    /*#__PURE__*/ React.createElement(
                      FormItem,
                      {
                        label: val.label
                      },
                      getFieldDecorator(
                        ''.concat(val.id),
                        _objectSpread({}, fieldDecorator)
                      )(_this2.renderControl(val, index))
                    )
                  )
                );
              });
              return /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'filter-form'
                },
                /*#__PURE__*/ React.createElement(
                  _Form,
                  null,
                  /*#__PURE__*/ React.createElement(
                    _Row,
                    {
                      gutter: [
                        {
                          xs: 30,
                          sm: 30,
                          md: 30,
                          lg: 30,
                          xl: 60
                        }
                      ],
                      type: 'flex'
                    },
                    formItems,
                    this.props.children &&
                      /*#__PURE__*/ React.createElement(
                        _Col,
                        {
                          style: {
                            flex: 1,
                            textAlign: 'right'
                          },
                          className: 'line-height-40'
                        },
                        this.props.children
                      )
                  )
                )
              );
            }
          }
        ]);

        return FormGroup;
      })(React.Component)),
      (_class2.propsType = {
        formType: PropTypes.array.isRequired,
        wrappedComponentRef: PropTypes.object
      }),
      _temp))
  ) || _class);
export default FormGroup;

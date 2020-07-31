'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/row/style');

var _row = _interopRequireDefault(require('antd/es/row'));

require('antd/es/col/style');

var _col = _interopRequireDefault(require('antd/es/col'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

require('antd/es/tree-select/style');

var _treeSelect = _interopRequireDefault(require('antd/es/tree-select'));

require('antd/es/input/style');

var _input = _interopRequireDefault(require('antd/es/input'));

var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));

require('antd/es/select/style');

var _select = _interopRequireDefault(require('antd/es/select'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

require('antd/es/form/style');

var _form = _interopRequireDefault(require('antd/es/form'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

require('./style/index.css');

var _dec, _class, _class2, _temp;

// eslint-disable-next-line no-unused-vars
var FormItem = _form.default.Item;
var FormGroup =
  ((_dec = _form.default.create()),
  _dec(
    (_class =
      ((_temp = _class2 = /*#__PURE__*/ (function(_React$Component) {
        (0, _inherits2.default)(FormGroup, _React$Component);

        var _super = (0, _createSuper2.default)(FormGroup);

        function FormGroup(props) {
          var _this;

          (0, _classCallCheck2.default)(this, FormGroup);
          _this = _super.call(this, props);
          _this.state = {};
          return _this;
        }

        (0, _createClass2.default)(FormGroup, [
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
                  return /*#__PURE__*/ _react.default.createElement(
                    _select.default.Option,
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
                  return /*#__PURE__*/ _react.default.createElement(
                    _select.default,
                    controlProps,
                    Options
                  );
                }

                return /*#__PURE__*/ _react.default.createElement(ControlType, controlProps);
              } else if ((0, _typeof2.default)(controlType) === 'object') {
                return ControlType;
              } else {
                if (ControlType === 1) {
                  return /*#__PURE__*/ _react.default.createElement(_input.default, controlProps);
                } else if (ControlType === 2) {
                  Options = this.createOptions(selectOptions);
                  return /*#__PURE__*/ _react.default.createElement(
                    _select.default,
                    controlProps,
                    Options
                  );
                } else if (ControlType === 3) {
                  return /*#__PURE__*/ _react.default.createElement(
                    _treeSelect.default,
                    controlProps
                  );
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
              if (!formType) return _message2.default.error('请传入formType');
              var formItems = formType.map(function(val, index) {
                var _val$fieldDecorator = val.fieldDecorator,
                  fieldDecorator = _val$fieldDecorator === void 0 ? {} : _val$fieldDecorator;
                return (
                  /*#__PURE__*/
                  // <Col style={{ paddingLeft: 32, paddingRight: 32 }} xs={24} sm={24} md={12} lg={8} key={index}>
                  // <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={index}>
                  _react.default.createElement(
                    _col.default,
                    {
                      xs: 24,
                      sm: 12,
                      md: 8,
                      key: index
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      FormItem,
                      {
                        label: val.label
                      },
                      getFieldDecorator(
                        ''.concat(val.id),
                        (0, _objectSpread2.default)({}, fieldDecorator)
                      )(_this2.renderControl(val, index))
                    )
                  )
                );
              });
              return /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'filter-form'
                },
                /*#__PURE__*/ _react.default.createElement(
                  _form.default,
                  null,
                  /*#__PURE__*/ _react.default.createElement(
                    _row.default,
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
                      /*#__PURE__*/ _react.default.createElement(
                        _col.default,
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
      })(_react.default.Component)),
      (_class2.propsType = {
        formType: _propTypes.default.array.isRequired,
        wrappedComponentRef: _propTypes.default.object
      }),
      _temp))
  ) || _class);
var _default = FormGroup;
exports.default = _default;

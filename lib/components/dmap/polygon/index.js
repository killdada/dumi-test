'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/input-number/style');

var _inputNumber = _interopRequireDefault(require('antd/es/input-number'));

require('antd/es/button/style');

var _button = _interopRequireDefault(require('antd/es/button'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

var _underscore = _interopRequireDefault(require('underscore'));

var _map = require('../../utils/map');

require('./index.css');

var _this = void 0;

var MAX_COUNT = 5; // const SAVE_PLOYGEN = false;

var NO_SAVE_PLOYGEN = true;
var POLYGON_STYPE_LIST = [
  {
    lineStyle: {
      fillColor: '#b8cb50',
      borderWeight: 1,
      strokeColor: '#b8cb50',
      fillOpacity: 0.4
    },
    blockStyle: '#b8cb50'
  },
  {
    lineStyle: {
      fillColor: '#fab646',
      borderWeight: 1,
      strokeColor: '#fab646',
      fillOpacity: 0.4
    },
    blockStyle: '#fab646'
  },
  {
    lineStyle: {
      fillColor: '#ff9997',
      borderWeight: 1,
      strokeColor: '#ff9997',
      fillOpacity: 0.4
    },
    blockStyle: '#ff9997'
  }
];

var handlePolygonPath = function handlePolygonPath(amapPath) {
  var result = _underscore.default.map(amapPath, function(path) {
    var lat = path.lat,
      lng = path.lng;
    return [lng, lat];
  });

  return result;
}; // Form Item rules example ！！！
// eslint-disable-next-line no-unused-vars

var checkDPolygon = function checkDPolygon(rule, value, callback) {
  value = value || [];
  _this.isCheckDPolygon = false;

  if (value.length === 0) {
    callback('请绘制地图区域');
    return;
  }

  _this.isCheckDPolygon = true;
  callback();
};

var DPolygon = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(DPolygon, _React$Component);

  var _super = (0, _createSuper2.default)(DPolygon);

  function DPolygon(props) {
    var _this2;

    (0, _classCallCheck2.default)(this, DPolygon);
    _this2 = _super.call(this, props);

    _this2.triggerChange = function(changedValue) {
      // Should provide an event to pass value to Form.
      var onChange = _this2.props.onChange; // let { value } = this.state;

      if (onChange) {
        onChange(changedValue);
      }
    };

    _this2.reloadMap = /*#__PURE__*/ (0, _asyncToGenerator2.default)(
      /*#__PURE__*/ _regenerator.default.mark(function _callee() {
        var isLoadMap;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return _this2.initAMap();

              case 2:
                isLoadMap = _context.sent;

                if (isLoadMap) {
                  _this2.handleValue();
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      })
    );
    var value = props.value || [];
    var center = props.center || '';
    var disabled = !!props.disabled;
    _this2.state = {
      value: value,
      center: center,
      disabled: disabled,
      isEdit: false,
      editingPloygen: undefined,
      polygonState: {},
      polygonArr: [],
      polygonIndex: 0
    };
    _this2.map = undefined;
    _this2.isAdding = false;
    return _this2;
  }

  (0, _createClass2.default)(DPolygon, [
    {
      key: 'componentDidMount',
      value: (function() {
        var _componentDidMount = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee2() {
            var isSetup, isLoadMap;
            return _regenerator.default.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _context2.next = 2;
                      return (0, _map.setupMap)('polygon');

                    case 2:
                      isSetup = _context2.sent;
                      console.log('isSetup', isSetup);

                      if (!isSetup) {
                        _context2.next = 9;
                        break;
                      }

                      _context2.next = 7;
                      return this.initAMap();

                    case 7:
                      isLoadMap = _context2.sent;

                      if (isLoadMap) {
                        this.handleValue();
                      }

                    case 9:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              this
            );
          })
        );

        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }

        return componentDidMount;
      })()
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var value = nextProps.value,
          center = nextProps.center,
          disabled = nextProps.disabled;
        this.setState({
          value: value,
          disabled: !!disabled,
          center: center
        });
      }
    },
    {
      key: 'initAMap',
      value: (function() {
        var _initAMap = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee3() {
            var _this3 = this;

            var timeout, center, mapOption, data, hasPolygon;
            return _regenerator.default.wrap(
              function _callee3$(_context3) {
                while (1) {
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      if (window.AMap) {
                        _context3.next = 3;
                        break;
                      }

                      timeout = setInterval(function() {
                        if (window.AMap) {
                          _this3.initAMap();

                          clearTimeout(timeout);
                        }
                      }, 500);
                      return _context3.abrupt('return', false);

                    case 3:
                      center = this.state.center;
                      mapOption = {
                        resizeEnable: true,
                        zoom: 16
                      };
                      data = this.state.value;
                      hasPolygon = data && data.length;

                      if (center !== '0,0' && !hasPolygon) {
                        mapOption.center = center.split(',');
                      } // eslint-disable-next-line react/no-string-refs

                      this.map = new AMap.Map(this.refs.container, mapOption);
                      return _context3.abrupt('return', true);

                    case 10:
                    case 'end':
                      return _context3.stop();
                  }
                }
              },
              _callee3,
              this
            );
          })
        );

        function initAMap() {
          return _initAMap.apply(this, arguments);
        }

        return initAMap;
      })()
    },
    {
      key: 'handleValue',
      value: function handleValue() {
        var _this4 = this;

        var data =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.value;
        var polygon_path = {};
        var polygonArr = [];

        if (data && data.length) {
          _underscore.default.map(data, function(item, index) {
            var rangeValue = item.rangeValue;
            item.rangeValue = (0, _map.stringtoArray)(rangeValue);
            polygon_path['polygon_'.concat(index)] = (0, _map.stringtoArray)(rangeValue);
            polygonArr.push('polygon_'.concat(index));
          });
        }

        var polygonArrLen = polygonArr.length;
        var polygonIndex = polygonArrLen ? polygonArrLen - 1 : 0;
        this.setState(
          {
            value: data,
            polygonArr: polygonArr,
            polygonIndex: polygonIndex,
            polygonState: polygon_path
          },
          function() {
            _this4.drawPolygon();
          }
        );
      }
    },
    {
      key: 'drawPolygon',
      value: function drawPolygon() {
        var _this5 = this;

        var OverlayGroupCount = this.map.getAllOverlays().length;
        var _this$state = this.state,
          polygonState = _this$state.polygonState,
          polygonArr = _this$state.polygonArr;
        if (OverlayGroupCount === polygonArr.length) return;
        var polygons = [];

        _underscore.default.map(polygonArr, function(pName, index) {
          var path = polygonState[pName];
          var newPolygon = new AMap.Polygon(
            (0, _objectSpread2.default)(
              {
                path: path
              },
              POLYGON_STYPE_LIST[index % POLYGON_STYPE_LIST.length].lineStyle
            )
          );
          polygons.push(newPolygon);
          var plg = new AMap.OverlayGroup([newPolygon]);

          _this5.map.add(plg);

          _this5.setState((0, _defineProperty2.default)({}, pName, newPolygon));
        });

        this.map.setFitView(polygons);
      }
    },
    {
      key: 'onEdit',
      value: function onEdit(polygonName, polygon) {
        var _this6 = this;

        if (this.state.isEdit) this.polyEditor.close();
        this.polyEditor = new AMap.PolyEditor(this.map, polygon);
        this.polyEditor.open();
        var editingPloygen = polygonName;
        this.polyEditor.on('adjust', function(event) {
          _this6.handleEditPolygon(event.target, editingPloygen);
        });
        this.setState({
          isEdit: true,
          editingPloygen: editingPloygen
        });
      }
    },
    {
      key: 'onCloseEdit',
      value: function onCloseEdit() {
        this.polyEditor.close();
        this.setState({
          isEdit: false,
          editingPloygen: undefined
        });
      }
    },
    {
      key: 'handleEditPolygon',
      value: function handleEditPolygon(polygon, editingPloygen) {
        var _this$state2 = this.state,
          value = _this$state2.value,
          polygonArr = _this$state2.polygonArr,
          polygonState = _this$state2.polygonState;
        var path = handlePolygonPath(polygon.getPath());
        var index = polygonArr.indexOf(editingPloygen);
        polygonState[editingPloygen] = path;
        value[index] = Object.assign(value[index], {
          rangeValue: path
        });
        this.triggerChange(value);
        this.setState({
          value: value,
          polygonState: polygonState
        });
      }
    },
    {
      key: 'addPloygen',
      value: function addPloygen() {
        var _this7 = this;

        var self = this;
        if (this.isAdding) return;
        this.isAdding = true;
        var _this$state3 = this.state,
          value = _this$state3.value,
          polygonArr = _this$state3.polygonArr,
          polygonState = _this$state3.polygonState,
          polygonIndex = _this$state3.polygonIndex,
          isEdit = _this$state3.isEdit;
        if (!value) value = [];
        if (isEdit) this.onCloseEdit();
        if (polygonArr.length >= MAX_COUNT)
          return _message2.default.warning(
            '\u6700\u591A\u6DFB\u52A0'.concat(MAX_COUNT, '\u4E2A\u5730\u56FE\u56F4\u680F')
          );

        _message2.default.info(
          '\u5F00\u59CB\u7ED8\u5236\u5730\u56FE\u56F4\u680F\u540E\uFF0C\u53CC\u51FB\u6216\u53F3\u952E\u7ED3\u675F\u3002'
        );

        polygonIndex++;
        var mouseTool = new AMap.MouseTool(this.map);
        var newPolygonstyle =
          POLYGON_STYPE_LIST[polygonIndex % POLYGON_STYPE_LIST.length].lineStyle;
        mouseTool.polygon((0, _objectSpread2.default)({}, newPolygonstyle));
        mouseTool.on('draw', function(event) {
          _message2.default.info('\u5730\u56FE\u56F4\u680F\u7ED8\u5236\u5B8C\u6210');

          var newPolygon = event.obj;
          mouseTool.close(NO_SAVE_PLOYGEN);
          var path = handlePolygonPath(newPolygon.getPath());
          var tmp = {
            rangeType: 2,
            rangeValue: path,
            isFreeDelivery: 0,
            deliveryFee: 0
          };
          polygonArr.push('polygon_'.concat(polygonIndex));
          value.push(tmp);
          polygonState['polygon_'.concat(polygonIndex)] = path;
          self.map.add(new AMap.OverlayGroup([event.obj]));

          _this7.triggerChange(value);

          _this7.isAdding = false;
          self.setState(
            (0, _defineProperty2.default)(
              {
                value: value,
                polygonArr: polygonArr,
                polygonState: polygonState,
                polygonIndex: polygonIndex
              },
              'polygon_'.concat(polygonIndex),
              newPolygon
            )
          );
        });
      }
    },
    {
      key: 'delPloygen',
      value: function delPloygen() {
        var _this8 = this;

        var _this$state4 = this.state,
          editingPloygen = _this$state4.editingPloygen,
          value = _this$state4.value,
          polygonArr = _this$state4.polygonArr,
          polygonState = _this$state4.polygonState;
        var delIndex = polygonArr.indexOf(editingPloygen); // delete over lay

        var allOverlays = this.map.getAllOverlays(); // eslint-disable-next-line no-unused-expressions

        allOverlays[delIndex];
        this.map.remove(allOverlays[delIndex]); // delete data

        value.splice(delIndex, 1);
        polygonArr.splice(delIndex, 1);
        delete polygonState[editingPloygen];
        this.onCloseEdit();
        this.setState(
          (0, _defineProperty2.default)(
            {
              value: value,
              polygonArr: polygonArr,
              polygonState: polygonState
            },
            editingPloygen,
            undefined
          ),
          function() {
            _this8.triggerChange(value);
          }
        );
      }
    },
    {
      key: 'onChangeInput',
      value: function onChangeInput(index, e) {
        var value = this.state.value;
        value[index].deliveryFee = e;
        value[index].isFreeDelivery = e ? 1 : 0;
        this.setState({
          value: value
        });
        this.triggerChange(value);
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this9 = this;

        var _this$state5 = this.state,
          value = _this$state5.value,
          polygonArr = _this$state5.polygonArr,
          isEdit = _this$state5.isEdit,
          disabled = _this$state5.disabled;
        var polygonArrLen = (polygonArr && polygonArr.length) || 0;
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'dmap-wrap'
          },
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'dmap-container-wrap'
            },
            /*#__PURE__*/ _react.default.createElement('div', {
              className: 'dmap-container',
              ref: 'container'
            }),
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'dmap-tools-top'
              },
              /*#__PURE__*/ _react.default.createElement(_button.default, {
                key: 'reload',
                icon: 'reload',
                onClick: function onClick() {
                  _this9.reloadMap();
                }
              })
            ),
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'dmap-tools-bottom'
              },
              isEdit
                ? [
                    /*#__PURE__*/ _react.default.createElement(_button.default, {
                      key: 'delete',
                      icon: 'delete',
                      type: 'danger',
                      onClick: function onClick() {
                        _this9.delPloygen();
                      }
                    }),
                    /*#__PURE__*/ _react.default.createElement(_button.default, {
                      key: 'save',
                      icon: 'save',
                      type: 'primary',
                      onClick: function onClick() {
                        _this9.onCloseEdit();
                      }
                    })
                  ]
                : null
            )
          ),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'dmap-input-wrap'
            },
            _underscore.default.map(polygonArr, function(polygon, index) {
              var polygonIndex = polygon.split('_')[1];
              var styleIndex = polygonIndex % POLYGON_STYPE_LIST.length;
              return /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'dmap-input',
                  key: 'dmap-input-'.concat(index),
                  onClick: function onClick() {
                    if (!disabled) {
                      _this9.onEdit(polygon, _this9.state[polygon]);
                    }
                  }
                },
                /*#__PURE__*/ _react.default.createElement('span', {
                  className: 'input-block',
                  style: {
                    background: POLYGON_STYPE_LIST[styleIndex].blockStyle
                  }
                }),
                /*#__PURE__*/ _react.default.createElement(
                  'span',
                  {
                    className: 'input-text'
                  },
                  '\u914D\u9001\u8D39'
                ),
                /*#__PURE__*/ _react.default.createElement(
                  'span',
                  {
                    className: 'input'
                  },
                  /*#__PURE__*/ _react.default.createElement(_inputNumber.default, {
                    disabled: disabled,
                    min: 0,
                    size: 'small',
                    value: value[index].deliveryFee,
                    onChange: _this9.onChangeInput.bind(_this9, index)
                  })
                )
              );
            }),
            !disabled && polygonArrLen < MAX_COUNT
              ? /*#__PURE__*/ _react.default.createElement(_button.default, {
                  icon: 'plus',
                  size: 'small',
                  shape: 'circle',
                  className: 'dmap-input',
                  onClick: function onClick() {
                    _this9.addPloygen();
                  }
                })
              : null
          )
        );
      }
    }
  ]);
  return DPolygon;
})(_react.default.Component);

var _default = DPolygon;
exports.default = _default;

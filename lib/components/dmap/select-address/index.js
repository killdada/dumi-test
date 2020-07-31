'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.getRegeoCode = exports.getNearbyAddress = void 0;

require('antd/es/modal/style');

var _modal = _interopRequireDefault(require('antd/es/modal'));

require('antd/es/input/style');

var _input = _interopRequireDefault(require('antd/es/input'));

require('antd/es/icon/style');

var _icon = _interopRequireDefault(require('antd/es/icon'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _underscore = _interopRequireDefault(require('underscore'));

var _react = _interopRequireDefault(require('react'));

var _DescriptionList = _interopRequireDefault(require('ant-design-pro/lib/DescriptionList'));

var _map = require('../../utils/map');

require('./index.css');

/* eslint-disable react/no-string-refs */
// eslint-disable-next-line no-unused-vars
var Description = _DescriptionList.default.Description;

var getNearbyAddress = function getNearbyAddress(searchKey) {
  var query = (0, _objectSpread2.default)(
    (0, _objectSpread2.default)({}, searchKey),
    {},
    {
      pageSize: 20
    }
  );
  var result = (0, _map.placeSearch)(query)
    .then(function(res) {
      return res;
    })
    .catch(function(e) {
      console.error('getNearbyAddress error:', e);
      return false;
    });
  return result;
};

exports.getNearbyAddress = getNearbyAddress;

var getRegeoCode = function getRegeoCode(lnglat) {
  var result = (0, _map.regeoCode)(lnglat)
    .then(function(res) {
      return res;
    })
    .catch(function(e) {
      console.error('getRegeoCode error:', e);
      return false;
    });
  return result;
};

exports.getRegeoCode = getRegeoCode;

var DSelectAddress = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(DSelectAddress, _React$Component);

  var _super = (0, _createSuper2.default)(DSelectAddress);

  function DSelectAddress(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DSelectAddress);
    _this = _super.call(this, props);

    _this.handleOk = function() {
      var lnglat = _this.state.lnglat;

      _this.props.onChange({
        lnglat: lnglat
      });

      _this.setState({
        modalVisible: false
      });
    };

    var address = props.address || '';
    var area = props.area || {};

    var _lnglat = props.lnglat || {
      longitude: 0,
      latitude: 0
    };

    var disabled = !!props.disabled;
    _this.state = {
      address: address,
      area: area,
      lnglat: _lnglat,
      disabled: disabled,
      modalVisible: false,
      searchKey: undefined
    };
    _this.map = undefined;
    _this.marker = undefined;
    _this.positionPicker = undefined;
    return _this;
  }

  (0, _createClass2.default)(DSelectAddress, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        (0, _map.setupMap)('select adres');
      }
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        var pre_address = this.props.address;
        var pre_area = this.props.area;
        var pre_disabled = this.props.disabled;
        var address = nextProps.address || '';
        var area = nextProps.area || {};
        var lnglat = nextProps.lnglat || {
          longitude: 0,
          latitude: 0
        };
        var disabled = !!nextProps.disabled;

        if (pre_disabled !== disabled) {
          this.setState({
            disabled: disabled
          });
        }

        if (_underscore.default.isEmpty(pre_address) || !pre_area) {
          this.setState(
            {
              address: address,
              area: area,
              lnglat: lnglat
            },
            /*#__PURE__*/ (0, _asyncToGenerator2.default)(
              /*#__PURE__*/ _regenerator.default.mark(function _callee() {
                var longitude, latitude, req, res, name;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch ((_context.prev = _context.next)) {
                      case 0:
                        if (window.AMap) {
                          _context.next = 3;
                          break;
                        }

                        _context.next = 3;
                        return (0, _map.setupMap)('adres');

                      case 3:
                        (longitude = lnglat.longitude), (latitude = lnglat.latitude);

                        if (!(longitude !== 0 && latitude !== 0)) {
                          _context.next = 10;
                          break;
                        }

                        req = (0, _map.getLnglat)(lnglat);
                        _context.next = 8;
                        return getRegeoCode(req);

                      case 8:
                        res = _context.sent;

                        if (res) {
                          name = res ? res[0].name : '';

                          _this2.setState({
                            name: name
                          });
                        }

                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee);
              })
            )
          );
        } else if (address !== pre_address || !_underscore.default.isEqual(area, pre_area)) {
          // 修改区域和地址时，需要用户手动重新选取地址
          this.setState(
            {
              name: undefined,
              lnglat: {
                longitude: 0,
                latitude: 0
              }
            },
            function() {
              var lnglat = {
                longitude: 0,
                latitude: 0
              };

              _this2.props.onChange({
                lnglat: lnglat
              });
            }
          );
        }
      }
    },
    {
      key: 'searchAddress',
      value: (function() {
        var _searchAddress = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee2(keyword) {
            var area, searchKey, nearBy, pois;
            return _regenerator.default.wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      area = this.state.area;
                      searchKey = {
                        keyword: keyword,
                        city: (area && area.cityName) || '\u5168\u56FD'
                      };
                      _context2.next = 4;
                      return getNearbyAddress(searchKey);

                    case 4:
                      nearBy = _context2.sent;

                      if (nearBy && nearBy.length) {
                        pois = nearBy;
                      } else {
                        pois = [];
                      }

                      this.setState({
                        pois: pois
                      });

                    case 7:
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

        function searchAddress(_x) {
          return _searchAddress.apply(this, arguments);
        }

        return searchAddress;
      })()
    },
    {
      key: 'handleMap',
      value: (function() {
        var _handleMap = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee3() {
            var _this3 = this;

            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    setTimeout(function() {
                      AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
                        var MAP_OPTIONS = {
                          resizeEnable: true,
                          zoom: 16
                        };
                        var lnglat = _this3.state.lnglat;

                        if (lnglat.longitude !== 0 && lnglat.latitude !== 0) {
                          MAP_OPTIONS.center = (0, _map.getLnglat)(lnglat);
                        } // eslint-disable-next-line react/no-string-refs

                        _this3.map = new AMap.Map(_this3.refs.container, MAP_OPTIONS);
                        _this3.positionPicker = new PositionPicker({
                          mode: 'dragMap',
                          // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
                          map: _this3.map // 依赖地图对象
                        });

                        _this3.positionPicker.on('success', function(positionResult) {
                          var regeocode = positionResult.regeocode;
                          var pois = regeocode.pois;

                          _this3.setState({
                            pois: pois
                          });
                        });

                        _this3.positionPicker.on('fail', function(positionResult) {
                          _message2.default.error(
                            '\u641C\u7D22\u5730\u5740\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5'
                          );

                          console.error('failed', positionResult);

                          _this3.setState({
                            pois: []
                          });
                        });

                        if (lnglat.longitude === 0 && lnglat.latitude === 0) {
                          var _this3$map$getCenter = _this3.map.getCenter(),
                            lng = _this3$map$getCenter.lng,
                            lat = _this3$map$getCenter.lat;

                          _this3.positionPicker.start([lng, lat]);
                        } else {
                          _this3.positionPicker.start((0, _map.getLnglat)(lnglat));
                        }

                        _this3.map.panBy(0, 1);
                      });
                    }, 800);

                  case 1:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3);
          })
        );

        function handleMap() {
          return _handleMap.apply(this, arguments);
        }

        return handleMap;
      })()
    },
    {
      key: 'initAMap',
      value: (function() {
        var _initAMap = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/ _regenerator.default.mark(function _callee4() {
            var _this4 = this;

            var timeout;
            return _regenerator.default.wrap(function _callee4$(_context4) {
              while (1) {
                switch ((_context4.prev = _context4.next)) {
                  case 0:
                    if (!window.AMap || !window.AMapUI) {
                      timeout = setInterval(function() {
                        if (window.AMap) {
                          _this4.initAMap();

                          clearTimeout(timeout);
                        }
                      }, 500);
                    }

                    return _context4.abrupt('return', true);

                  case 2:
                  case 'end':
                    return _context4.stop();
                }
              }
            }, _callee4);
          })
        );

        function initAMap() {
          return _initAMap.apply(this, arguments);
        }

        return initAMap;
      })()
    },
    {
      key: 'onClickItem',
      value: function onClickItem(name, location) {
        var lnglat = {
          longitude: location.lng,
          latitude: location.lat
        };
        this.map.setCenter((0, _map.getLnglat)(lnglat));
        this.map.panBy(0, 1);
        this.setState({
          name: name,
          lnglat: lnglat
        });
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var _this$state = this.state,
          name = _this$state.name,
          modalVisible = _this$state.modalVisible,
          pois = _this$state.pois,
          disabled = _this$state.disabled,
          searchKey = _this$state.searchKey;
        var mapSelectAdsModalProp = {
          width: 1000,
          title: '\u9009\u62E9\u4F4D\u7F6E',
          className: 'map-select-ads-modal',
          maskClosable: false,
          visible: modalVisible,
          onOk: function onOk() {
            _this5.handleOk();
          },
          onCancel: function onCancel() {
            _this5.setState({
              modalVisible: false
            });
          }
        };
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'dmap-select-address-wrap'
          },
          /*#__PURE__*/ _react.default.createElement(
            'span',
            {
              className: 'pointer '.concat(name ? '' : 'a-my-theme'),
              onClick: function onClick() {
                if (!disabled) {
                  _this5.setState(
                    {
                      modalVisible: true
                    },
                    function() {
                      _this5.handleMap();
                    }
                  );
                }
              }
            },
            /*#__PURE__*/ _react.default.createElement(_icon.default, {
              type: 'environment',
              theme: 'filled'
            }),
            /*#__PURE__*/ _react.default.createElement(
              'span',
              null,
              name ? ''.concat(name, ' \u9644\u8FD1') : '点击选择地图位置'
            )
          ),
          modalVisible
            ? /*#__PURE__*/ _react.default.createElement(
                _modal.default,
                mapSelectAdsModalProp,
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
                      className: 'dmap-toast'
                    },
                    /*#__PURE__*/ _react.default.createElement(
                      _DescriptionList.default,
                      {
                        title: '\u5F53\u524D\u4F4D\u7F6E',
                        col: 1
                      },
                      /*#__PURE__*/ _react.default.createElement(
                        Description,
                        {
                          term: '\u5F53\u524D\u9009\u4E2D'
                        },
                        name || '未选择'
                      )
                    )
                  ),
                  /*#__PURE__*/ _react.default.createElement(_input.default.Search, {
                    placeholder: '\u56DE\u8F66\u6216\u70B9\u51FB\u56FE\u6807\u641C\u7D22',
                    value: searchKey,
                    className: 'list-search',
                    onChange: function onChange(e) {
                      _this5.setState({
                        searchKey: e.target.value
                      });
                    },
                    onSearch: function onSearch(value) {
                      _this5.searchAddress(value);
                    }
                  }),
                  /*#__PURE__*/ _react.default.createElement(
                    'div',
                    {
                      className: 'dmap-tools',
                      ref: true
                    },
                    pois && pois.length
                      ? _underscore.default.map(pois, function(poi, index) {
                          return /*#__PURE__*/ _react.default.createElement(
                            'div',
                            {
                              key: 'poi-'.concat(index),
                              onClick: function onClick() {
                                _this5.onClickItem(poi.name, poi.location);
                              },
                              className: 'position-list-item'
                            },
                            poi.name
                          );
                        })
                      : /*#__PURE__*/ _react.default.createElement(
                          'div',
                          {
                            className: 'position-list-item',
                            style: {
                              color: 'rgba(0, 0, 0, 0.15)'
                            }
                          },
                          '\u641C\u7D22\u4E0D\u5230\u4F4D\u7F6E'
                        )
                  )
                )
              )
            : null
        );
      }
    }
  ]);
  return DSelectAddress;
})(_react.default.Component);

var _default = DSelectAddress;
exports.default = _default;

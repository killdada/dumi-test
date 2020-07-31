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

require('antd/es/col/style');

var _col = _interopRequireDefault(require('antd/es/col'));

require('antd/es/input/style');

var _input = _interopRequireDefault(require('antd/es/input'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
);

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

require('antd/es/tabs/style');

var _tabs = _interopRequireDefault(require('antd/es/tabs'));

var _react = _interopRequireDefault(require('react'));

var _underscore = _interopRequireDefault(require('underscore'));

var _tableItem = _interopRequireDefault(require('./table-item.jsx'));

require('./recycler-view.css');

var _const = require('./const');

// eslint-disable-next-line no-unused-vars
var TabPane = _tabs.default.TabPane;

function CreateRecycler(decorator) {
  var _class, _class2, _temp;

  var RecyclerView =
    decorator(
      (_class =
        ((_temp = _class2 = /*#__PURE__*/ (function(_React$Component) {
          (0, _inherits2.default)(RecyclerView, _React$Component);

          var _super = (0, _createSuper2.default)(RecyclerView);

          function RecyclerView(props) {
            var _this;

            (0, _classCallCheck2.default)(this, RecyclerView);
            _this = _super.call(this, props);
            _this.state = {
              currentTabKey: '',
              tabList: [],
              orderId: '',
              serviceId: '',
              code: '',
              consumeOrderId: '',
              total: 0,
              currentPage: 1,
              loading: false
            };
            _this.pageSize = 10;
            _this.handleChange = _this.handleChange.bind(
              (0, _assertThisInitialized2.default)(_this)
            );
            _this.handleSearch = _this.handleSearch.bind(
              (0, _assertThisInitialized2.default)(_this)
            );
            _this.onPageChange = _this.onPageChange.bind(
              (0, _assertThisInitialized2.default)(_this)
            );
            _this.generateTabList = _underscore.default.debounce(_this.generateTabList, 200);
            return _this;
          }

          (0, _createClass2.default)(RecyclerView, [
            {
              key: 'componentDidMount',
              value: function componentDidMount() {
                this.generateTabList(this.props);
              }
            },
            {
              key: 'componentWillReceiveProps',
              value: function componentWillReceiveProps(nextProps) {
                this.generateTabList(nextProps);
              }
            },
            {
              key: 'generateTabList',
              value: function generateTabList(props) {
                var _this2 = this;

                var settlementItems = props.settlementItems,
                  dynamicTab = props.dynamicTab; // tabList 已经生成则不再执行

                if (this.state.tabList && this.state.tabList.length) {
                  return false;
                }

                if (!settlementItems || !settlementItems.length) {
                  return console.warn('settlementItems is empty');
                }

                var settlementItemsClone = JSON.parse(JSON.stringify(settlementItems));
                settlementItemsClone.sort(function(a, b) {
                  return a - b;
                }); // 含商品订单结算项->添加退货单和费用调整

                if (settlementItemsClone.includes(_const.TAB_ORDER)) {
                  settlementItemsClone.splice(1, 0, _const.TAB_SERVICE, _const.TAB_FEE);
                }

                var tabList = settlementItemsClone.map(function(key) {
                  return _this2.generateTabItem(key);
                });

                if (dynamicTab) {
                  tabList.push({
                    key: dynamicTab.key,
                    tabName: dynamicTab.tabName
                  });
                }

                this.setState(
                  {
                    tabList: tabList,
                    currentTabKey: settlementItemsClone[0]
                  },
                  function() {
                    _this2.getList();
                  }
                );
              }
            },
            {
              key: 'generateTabItem',
              value: function generateTabItem(tabKey) {
                return {
                  key: tabKey,
                  tabName: this.tabFilter(tabKey)
                };
              }
            },
            {
              key: 'tabFilter',
              value: function tabFilter(tabKey) {
                switch (tabKey) {
                  case _const.TAB_ORDER:
                    return '商品订单';

                  case _const.TAB_COUPON_CONSUME:
                    return '电子券核销';

                  case _const.TAB_CARD_CONSUME:
                    return '卡核销';

                  case _const.TAB_SERVICE:
                    return '退货单';

                  case _const.TAB_FEE:
                    return '费用调整';

                  default:
                    return '未知类型';
                }
              }
            },
            {
              key: 'handleChange',
              value: function handleChange(text) {
                var _this3 = this;

                return function(e) {
                  switch (text) {
                    case 'tabKey':
                      _this3.resetTableData(e);

                      break;

                    case 'orderId':
                    case 'serviceId':
                    case 'code':
                    case 'consumeOrderId':
                      _this3.setState(
                        (0, _defineProperty2.default)({}, text, e.target.value.trim())
                      );

                      break;

                    default:
                      break;
                  }
                };
              }
            },
            {
              key: 'resetTableData',
              value: function resetTableData(currentKey) {
                var _this4 = this;

                this.pageSize = 10;
                this.setState(
                  {
                    currentTabKey: Number(currentKey),
                    orderId: '',
                    serviceId: '',
                    code: '',
                    consumeOrderId: '',
                    sourceList: [],
                    currentPage: 1
                  },
                  function() {
                    if (_this4.isCurrentDynamicTab(_this4.props.dynamicTab)) {
                      return false;
                    }

                    _this4.getList();
                  }
                );
              }
              /**
               * 当前选中的是否是传入的动态 tab
               */
            },
            {
              key: 'isCurrentDynamicTab',
              value: function isCurrentDynamicTab(dynamicTab) {
                return (
                  dynamicTab && dynamicTab.component && this.state.currentTabKey === dynamicTab.key
                );
              }
            },
            {
              key: 'handleSearch',
              value: function handleSearch() {
                var _this5 = this;

                this.setState(
                  {
                    currentPage: 1
                  },
                  function() {
                    _this5.getList();
                  }
                );
              }
            },
            {
              key: 'getList',
              value: function getList() {
                var req = {
                  pageSize: this.pageSize,
                  pageNumber: this.state.currentPage,
                  billIdList: this.props.billIdList
                };
                var _this$state = this.state,
                  currentTabKey = _this$state.currentTabKey,
                  orderId = _this$state.orderId,
                  serviceId = _this$state.serviceId,
                  code = _this$state.code,
                  consumeOrderId = _this$state.consumeOrderId;

                if (
                  currentTabKey === _const.TAB_ORDER ||
                  currentTabKey === _const.TAB_FEE ||
                  currentTabKey === _const.TAB_COUPON_CONSUME
                ) {
                  req.orderId = orderId;
                }

                if (currentTabKey === _const.TAB_SERVICE || currentTabKey === _const.TAB_FEE) {
                  req.serviceId = serviceId;
                }

                if (currentTabKey === _const.TAB_COUPON_CONSUME) {
                  req.code = code;
                }

                if (currentTabKey === _const.TAB_CARD_CONSUME) {
                  req.consumeOrderId = consumeOrderId;
                }

                this.sendRequest(this.$ToolUtil.filterRequestArgs(req));
              }
            },
            {
              key: 'sendRequest',
              value: function sendRequest(options) {
                var _this6 = this;

                this.setState({
                  loading: true
                });
                var tabKey = this.state.currentTabKey;
                var service = this.renderService();
                return service(options)
                  .then(function(res) {
                    var _this6$state = _this6.state,
                      currentTabKey = _this6$state.currentTabKey,
                      currentPage = _this6$state.currentPage;
                    /* 判断当前 tab 和请求接口时的对应 tab 是否一致，不一致不加载数据 */

                    if (tabKey !== currentTabKey) {
                      return false;
                    }

                    var list = res && res.list ? res.list : [];
                    var total = res && res.total ? res.total : 0;
                    var resourceFilter =
                      currentTabKey === _const.TAB_ORDER || currentTabKey === _const.TAB_SERVICE
                        ? _this6.resetOrderList
                        : null;
                    var resourceData = resourceFilter
                      ? resourceFilter(list, currentPage, _this6.pageSize)
                      : list;

                    _this6.setState({
                      sourceList: resourceData,
                      total: total,
                      loading: false
                    });
                  })
                  .catch(function(err) {
                    console.error(err);

                    _this6.setState({
                      sourceList: [],
                      total: 0,
                      loading: false
                    });

                    _message2.default.error('获取列表失败');
                  });
              }
            },
            {
              key: 'renderService',
              value: function renderService() {
                var _this$$Api = this.$Api,
                  getOrderList = _this$$Api.getOrderList,
                  getServiceList = _this$$Api.getServiceList,
                  getFeeList = _this$$Api.getFeeList,
                  getCouponConsumeList = _this$$Api.getCouponConsumeList,
                  getCardConsumeList = _this$$Api.getCardConsumeList;

                switch (this.state.currentTabKey) {
                  case _const.TAB_ORDER:
                    return getOrderList;

                  case _const.TAB_SERVICE:
                    return getServiceList;

                  case _const.TAB_FEE:
                    return getFeeList;

                  case _const.TAB_COUPON_CONSUME:
                    return getCouponConsumeList;

                  case _const.TAB_CARD_CONSUME:
                    return getCardConsumeList;

                  default:
                    return null;
                }
              }
            },
            {
              key: 'resetOrderList',
              value: function resetOrderList(oldList, pageNum, pageSize) {
                var newList = [];

                _underscore.default.map(oldList, function(v, i) {
                  _underscore.default.map(v.skuList, function(item, index) {
                    var arr = _underscore.default.omit(v, 'skuList');

                    arr.skuList = item;
                    arr.id = pageSize * (pageNum - 1) + i + 1;

                    if (index === 0) {
                      arr.rowSpan = v.skuList.length;
                    } else {
                      arr.rowSpan = 0;
                    }

                    newList.push(arr);
                  });
                });

                return newList;
              }
            },
            {
              key: 'onPageChange',
              value: function onPageChange(current, pageSize) {
                var _this7 = this;

                if (pageSize) this.pageSize = pageSize;
                this.setState(
                  {
                    currentPage: current
                  },
                  function() {
                    _this7.getList();
                  }
                );
              }
            },
            {
              key: 'render',
              value: function render() {
                var dynamicTab = this.props.dynamicTab;
                var _this$state2 = this.state,
                  tabList = _this$state2.tabList,
                  currentTabKey = _this$state2.currentTabKey,
                  orderId = _this$state2.orderId,
                  serviceId = _this$state2.serviceId,
                  code = _this$state2.code,
                  consumeOrderId = _this$state2.consumeOrderId,
                  sourceList = _this$state2.sourceList,
                  loading = _this$state2.loading,
                  total = _this$state2.total,
                  currentPage = _this$state2.currentPage;
                var isSupplier = this.$platform === _const.PLATFORM.supplier;
                return /*#__PURE__*/ _react.default.createElement(
                  'div',
                  null,
                  tabList && tabList.length
                    ? /*#__PURE__*/ _react.default.createElement(
                        'div',
                        {
                          className: 'table-container'
                        },
                        /*#__PURE__*/ _react.default.createElement(
                          _tabs.default,
                          {
                            className: 'recycler-list-tabs',
                            type: isSupplier ? 'line' : 'card',
                            tabPosition: 'top',
                            defaultActiveKey: ''.concat(tabList[0].key),
                            onChange: this.handleChange('tabKey')
                          },
                          _underscore.default.map(tabList, function(tabItem) {
                            return /*#__PURE__*/ _react.default.createElement(TabPane, {
                              tab: tabItem.tabName,
                              key: ''.concat(tabItem.key)
                            });
                          })
                        ),
                        this.isCurrentDynamicTab(dynamicTab)
                          ? dynamicTab.component
                          : /*#__PURE__*/ _react.default.createElement(
                              _tableItem.default,
                              {
                                currentTabKey: currentTabKey,
                                dataSourceList: sourceList,
                                ToolUtil: this.$ToolUtil,
                                onPageChange: this.onPageChange,
                                loading: loading,
                                total: total,
                                currentPage: currentPage
                              },
                              /*#__PURE__*/ _react.default.createElement(
                                _row.default,
                                {
                                  className: 'margin-bottom-15 margin-top-5'
                                },
                                currentTabKey === _const.TAB_ORDER ||
                                  currentTabKey === _const.TAB_FEE
                                  ? /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 6,
                                        className: 'col-title'
                                      },
                                      '\u8BA2\u5355\u53F7\uFF1A',
                                      ' ',
                                      /*#__PURE__*/ _react.default.createElement(_input.default, {
                                        placeholder: '\u8BF7\u8F93\u5165\u8BA2\u5355\u53F7',
                                        value: orderId,
                                        onChange: this.handleChange('orderId'),
                                        style: {
                                          width: 'calc(100% - 90px)'
                                        }
                                      })
                                    )
                                  : null,
                                currentTabKey === _const.TAB_SERVICE ||
                                  currentTabKey === _const.TAB_FEE
                                  ? /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 6,
                                        className: 'col-title'
                                      },
                                      '\u552E\u540E\u5355\u53F7\uFF1A',
                                      ' ',
                                      /*#__PURE__*/ _react.default.createElement(_input.default, {
                                        placeholder: '\u8BF7\u8F93\u5165\u552E\u540E\u5355\u53F7',
                                        value: serviceId,
                                        onChange: this.handleChange('serviceId'),
                                        style: {
                                          width: 'calc(100% - 90px)'
                                        }
                                      })
                                    )
                                  : null,
                                currentTabKey === _const.TAB_COUPON_CONSUME
                                  ? /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 6,
                                        className: 'col-title'
                                      },
                                      '\u5151\u6362\u7801\uFF1A',
                                      ' ',
                                      /*#__PURE__*/ _react.default.createElement(_input.default, {
                                        placeholder: '\u8BF7\u8F93\u5165\u5151\u6362\u7801',
                                        value: code,
                                        onChange: this.handleChange('code'),
                                        style: {
                                          width: 'calc(100% - 90px)'
                                        }
                                      })
                                    )
                                  : null,
                                currentTabKey === _const.TAB_COUPON_CONSUME
                                  ? /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 7,
                                        className: 'col-title'
                                      },
                                      '\u5173\u8054\u8BA2\u5355\u53F7\uFF1A',
                                      ' ',
                                      /*#__PURE__*/ _react.default.createElement(_input.default, {
                                        placeholder:
                                          '\u8BF7\u8F93\u5165\u5173\u8054\u8BA2\u5355\u53F7',
                                        value: orderId,
                                        onChange: this.handleChange('orderId'),
                                        style: {
                                          width: 'calc(100% - 120px)'
                                        }
                                      })
                                    )
                                  : null,
                                currentTabKey === _const.TAB_CARD_CONSUME
                                  ? /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 7,
                                        className: 'col-title'
                                      },
                                      /*#__PURE__*/ _react.default.createElement(
                                        'span',
                                        null,
                                        '\u6838\u9500\u8BB0\u5F55\u7F16\u53F7\uFF1A '
                                      ),
                                      /*#__PURE__*/ _react.default.createElement(_input.default, {
                                        placeholder:
                                          '\u8BF7\u586B\u5199\u6838\u9500\u8BB0\u5F55\u7F16\u53F7',
                                        value: consumeOrderId,
                                        onChange: this.handleChange('consumeOrderId'),
                                        style: {
                                          width: 'calc(100% - 120px)'
                                        }
                                      })
                                    )
                                  : null,
                                isSupplier
                                  ? /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 6
                                      },
                                      /*#__PURE__*/ _react.default.createElement(
                                        _button.default,
                                        {
                                          type: 'primary',
                                          style: {
                                            width: 90
                                          },
                                          onClick: this.handleSearch
                                        },
                                        '\u67E5\u8BE2'
                                      )
                                    )
                                  : /*#__PURE__*/ _react.default.createElement(
                                      _col.default,
                                      {
                                        span: 6
                                      },
                                      /*#__PURE__*/ _react.default.createElement(_button.default, {
                                        shape: 'circle',
                                        icon: 'search',
                                        onClick: this.handleSearch
                                      })
                                    )
                              )
                            )
                      )
                    : /*#__PURE__*/ _react.default.createElement(
                        'div',
                        null,
                        '\u672C\u4F9B\u5E94\u5546\u6CA1\u6709\u914D\u7F6E\u7ED3\u7B97\u9879\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u3002'
                      )
                );
              }
            }
          ]);
          return RecyclerView;
        })(_react.default.Component)),
        (_class2.propTypes = {
          /* 入账单号列表，例：["1500434343", "1533081600"] */
          billIdList: _react.default.PropTypes.array,

          /* 结算项列表，例：[1, 2, 3] */
          settlementItems: _react.default.PropTypes.array,

          /* 如果需要传入扩展 tab 和组件，例 {tabName: '其它差异调整',key: 9997,component: Button}，注意：key 不能和已定义类型冲突 */
          dynamicTab: _react.default.PropTypes.object
        }),
        _temp))
    ) || _class;

  return RecyclerView;
}

var _default = CreateRecycler;
exports.default = _default;

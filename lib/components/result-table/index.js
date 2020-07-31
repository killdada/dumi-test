'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/pagination/style');

var _pagination = _interopRequireDefault(require('antd/es/pagination'));

require('antd/es/table/style');

var _table = _interopRequireDefault(require('antd/es/table'));

require('antd/es/col/style');

var _col = _interopRequireDefault(require('antd/es/col'));

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

var _objectPath = _interopRequireDefault(require('object-path'));

require('./index.css');

var ResultTable = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(ResultTable, _React$Component);

  var _super = (0, _createSuper2.default)(ResultTable);

  function ResultTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ResultTable);
    _this = _super.call(this, props);
    _this.state = {
      total: 0,
      resourceData: [],
      // 具体数据集
      currentPage: 1,
      // 当前页数
      loading: false
    };
    _this.lastOptions = {}; // 上一次请求数据的参数集

    _this.pageSize = _this.props.pageSize;
    _this.pageNumber = _this.props.pageNumber;
    return _this;
  }

  (0, _createClass2.default)(ResultTable, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(n) {
        // 是否重置列表数据标识
        if (n.resetResourceData) {
          this.setState({
            resourceData: [],
            total: 0
          });
          this.lastOptions = {};
        }
      }
    },
    {
      key: 'getSource',
      value: function getSource(options) {
        var _this2 = this;

        var self = this;
        var defaultOptions = {
          pageSize: this.pageSize,
          pageNumber: this.state.currentPage
        };
        var args = (0, _objectSpread2.default)(
          (0, _objectSpread2.default)(
            (0, _objectSpread2.default)({}, this.lastOptions),
            defaultOptions
          ),
          options
        );
        this.lastOptions = args; // 保证查询的页数与页面一致

        this.setState({
          currentPage: args.pageNumber,
          loading: true
        });
        return this.props
          .service(args)
          .then(function(data) {
            var total = (0, _objectPath.default)(data).get('total') || 0;
            var list = (0, _objectPath.default)(data).get('list') || [];
            var resourceData = self.props.resourceFilter
              ? self.props.resourceFilter(list, args.pageNumber, args.pageSize)
              : list;
            self.setState(
              {
                total: total,
                resourceData: resourceData,
                loading: false
              },
              function() {
                _this2.props.handleChange({
                  total: total,
                  list: (0, _toConsumableArray2.default)(resourceData)
                });
              }
            );
            return data;
          })
          .catch(function(err) {
            self.setState(
              {
                total: 0,
                resourceData: [],
                loading: false
              },
              function() {
                _this2.props.handleChange({
                  total: 0,
                  list: []
                });
              }
            );
          });
      }
    },
    {
      key: 'renderColumn',
      value: function renderColumn() {
        var _this3 = this;

        var _this$props = this.props,
          isShowIndex = _this$props.isShowIndex,
          columns = _this$props.columns;
        var indexColumn = {
          title: '序号',
          key: 'index',
          render: function render(name, record, index) {
            return _this3.pageSize * (_this3.pageNumber - 1) + index + 1;
          }
        };
        return isShowIndex
          ? [indexColumn].concat((0, _toConsumableArray2.default)(columns))
          : columns;
      }
    },
    {
      key: 'paginationConfig',
      value: function paginationConfig() {
        var self = this;
        return {
          total: this.state.total || 0,
          showQuickJumper: true,
          showSizeChanger: true,
          current: this.state.currentPage,
          onChange: function onChange(current) {
            self.setState(
              {
                currentPage: current
              },
              function() {
                self.getSource();
              }
            );
          },
          showTotal: function showTotal(total) {
            return '\u5171\u6709'.concat(total, '\u6761');
          },
          onShowSizeChange: function onShowSizeChange(current, pageSize) {
            self.pageSize = pageSize;
            self.setState(
              {
                currentPage: current
              },
              function() {
                self.getSource();
              }
            );
          }
        };
      }
    },
    {
      key: 'changePage',
      value: function changePage(page, size) {
        var _this4 = this;

        var oldSize = this.pageSize;
        this.pageSize = size;
        this.setState(
          {
            currentPage: oldSize === size ? page : 1
          },
          function() {
            _this4.getSource();
          }
        );
      }
    },
    {
      key: 'showTotal',
      value: function showTotal(total) {
        return '\u5171\u6709'.concat(total, '\u6761');
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this$props2 = this.props,
          title = _this$props2.title,
          children = _this$props2.children,
          defaultPagination = _this$props2.defaultPagination,
          scrollX = _this$props2.scrollX;
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'result-table'
          },
          /*#__PURE__*/ _react.default.createElement('h3', null, title),
          children,
          /*#__PURE__*/ _react.default.createElement(
            _col.default,
            {
              className: 'unit-text '.concat(children ? 'hadChildren' : '')
            },
            '\u5355\u4F4D\uFF1A\u5143'
          ),
          /*#__PURE__*/ _react.default.createElement(_table.default, {
            bordered: true,
            loading: this.state.loading,
            scroll: {
              x: scrollX
            },
            columns: this.renderColumn(),
            dataSource: this.state.resourceData,
            pagination: defaultPagination ? this.paginationConfig() : false
          }),
          defaultPagination
            ? null
            : /*#__PURE__*/ _react.default.createElement(_pagination.default, {
                showSizeChanger: true,
                defaultPageSize: this.pageSize,
                current: this.state.currentPage,
                total: this.state.total,
                onChange: this.changePage.bind(this),
                onShowSizeChange: this.changePage.bind(this),
                showTotal: this.showTotal.bind(this),
                style: {
                  margin: '15px 0',
                  textAlign: 'right'
                }
              })
        );
      }
    }
  ]);
  return ResultTable;
})(_react.default.Component);

ResultTable.propTypes = {
  service: _react.default.PropTypes.func,
  resourceFilter: _react.default.PropTypes.func,
  columns: _react.default.PropTypes.array
};
ResultTable.defaultProps = {
  pageSize: 10,
  isShowIndex: false
};
var _default = ResultTable;
exports.default = _default;

import 'antd/es/pagination/style';
import _Pagination from 'antd/es/pagination';
import 'antd/es/table/style';
import _Table from 'antd/es/table';
import 'antd/es/col/style';
import _Col from 'antd/es/col';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import React from 'react'; // eslint-disable-next-line no-unused-vars

import op from 'object-path';
import './index.css';

var ResultTable = /*#__PURE__*/ (function(_React$Component) {
  _inherits(ResultTable, _React$Component);

  var _super = _createSuper(ResultTable);

  function ResultTable(props) {
    var _this;

    _classCallCheck(this, ResultTable);

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

  _createClass(ResultTable, [
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

        var args = _objectSpread(
          _objectSpread(_objectSpread({}, this.lastOptions), defaultOptions),
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
            var total = op(data).get('total') || 0;
            var list = op(data).get('list') || [];
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
                  list: _toConsumableArray(resourceData)
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
        return isShowIndex ? [indexColumn].concat(_toConsumableArray(columns)) : columns;
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
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'result-table'
          },
          /*#__PURE__*/ React.createElement('h3', null, title),
          children,
          /*#__PURE__*/ React.createElement(
            _Col,
            {
              className: 'unit-text '.concat(children ? 'hadChildren' : '')
            },
            '\u5355\u4F4D\uFF1A\u5143'
          ),
          /*#__PURE__*/ React.createElement(_Table, {
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
            : /*#__PURE__*/ React.createElement(_Pagination, {
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
})(React.Component);

ResultTable.propTypes = {
  service: React.PropTypes.func,
  resourceFilter: React.PropTypes.func,
  columns: React.PropTypes.array
};
ResultTable.defaultProps = {
  pageSize: 10,
  isShowIndex: false
};
export default ResultTable;

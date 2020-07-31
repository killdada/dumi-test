import 'antd/es/pagination/style';
import _Pagination from 'antd/es/pagination';
import 'antd/es/table/style';
import _Table from 'antd/es/table';
import 'antd/es/col/style';
import _Col from 'antd/es/col';
import 'antd/es/icon/style';
import _Icon from 'antd/es/icon';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';

/* eslint-disable react/jsx-no-script-url */
import React from 'react';
import { TAB_ORDER, TAB_SERVICE, TAB_FEE, TAB_COUPON_CONSUME, TAB_CARD_CONSUME } from './const';
import './table-item.css';

function renderContent(value, record, index) {
  var obj = {
    children: value,
    props: {}
  };
  obj.props.rowSpan = record.rowSpan;
  return obj;
}

var TableItem = /*#__PURE__*/ (function(_React$Component) {
  _inherits(TableItem, _React$Component);

  var _super = _createSuper(TableItem);

  function TableItem(props) {
    var _this;

    _classCallCheck(this, TableItem);

    _this = _super.call(this, props);
    _this.pageSize = 10;
    _this.changePage = _this.changePage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TableItem, [
    {
      key: 'generateColumn',
      value: function generateColumn() {
        var columns = this.renderColumns();

        switch (this.props.currentTabKey) {
          case TAB_ORDER:
            return columns.orderListColumn;

          case TAB_SERVICE:
            return columns.serviceListColumn;

          case TAB_FEE:
            return columns.feeListColumn;

          case TAB_COUPON_CONSUME:
            return columns.couponListColumn;

          case TAB_CARD_CONSUME:
            return columns.cardListColumn;

          default:
            return null;
        }
      }
    },
    {
      key: 'renderColumns',
      value: function renderColumns() {
        var _this2 = this;

        var _this$props$ToolUtil = this.props.ToolUtil,
          convertPrice = _this$props$ToolUtil.convertPrice,
          convertOrderType = _this$props$ToolUtil.convertOrderType,
          convertTime = _this$props$ToolUtil.convertTime,
          convertServiceType = _this$props$ToolUtil.convertServiceType;
        var orderListColumn = [
          {
            title: '订单号',
            dataIndex: 'orderId',
            key: 'orderId',
            render: function render(text, record, index) {
              return renderContent(text, record, index);
            }
          },
          {
            title: '商品名称',
            dataIndex: 'skuList.productName',
            key: 'productName',
            className: 'product-name'
          },
          {
            title: '选项',
            dataIndex: 'skuList.skuName',
            key: 'skuName',
            className: 'skuName'
          },
          {
            title: '购买数量',
            dataIndex: 'skuList.skuCount',
            key: 'skuCount',
            className: 'skuCount'
          },
          {
            title: '结算价',
            dataIndex: 'skuList.costPrice',
            key: 'costPrice',
            className: 'costPrice',
            render: function render(text) {
              var price = convertPrice(text);
              return /*#__PURE__*/ React.createElement(
                'div',
                {
                  style: {
                    whiteSpace: 'nowrap'
                  }
                },
                price
              );
            }
          },
          {
            title: '订单结算额',
            dataIndex: 'orderAmount',
            key: 'orderAmount',
            render: function render(text, record, index) {
              return renderContent(convertPrice(text), record, index);
            }
          },
          {
            title: '订单类型',
            dataIndex: 'orderType',
            key: 'orderType',
            render: function render(text, record, index) {
              return renderContent(convertOrderType(text), record, index);
            }
          },
          {
            title: '订单生效时间',
            dataIndex: 'effectiveTime',
            key: 'effectiveTime',
            render: function render(text, record, index) {
              return renderContent(convertTime(text), record, index);
            }
          },
          {
            title: '交易完成时间',
            dataIndex: 'finishTime',
            key: 'finishTime',
            render: function render(text, record, index) {
              return renderContent(convertTime(text), record, index);
            }
          }
        ];
        var serviceListColumn = [
          {
            title: '售后单号',
            dataIndex: 'serviceId',
            key: 'serviceId',
            render: function render(text, record, index) {
              return renderContent(text, record, index);
            }
          },
          {
            title: '原始订单号',
            dataIndex: 'orderId',
            key: 'orderId',
            render: function render(text, record, index) {
              return renderContent(text, record, index);
            }
          },
          {
            title: '售后类型',
            dataIndex: 'serviceType',
            key: 'serviceType',
            render: function render(text, record, index) {
              return renderContent(convertServiceType(text), record, index);
            }
          },
          {
            title: '商品名称',
            dataIndex: 'skuList.productName',
            key: 'productName'
          },
          {
            title: '选项',
            dataIndex: 'skuList.skuName',
            key: 'skuName'
          },
          {
            title: '售后数量',
            dataIndex: 'skuList.skuCount',
            key: 'skuCount'
          },
          {
            title: '结算价',
            dataIndex: 'skuList.costPrice',
            key: 'costPrice',
            render: function render(text, record) {
              return convertPrice(text);
            }
          },
          {
            title: '退货结算额',
            dataIndex: 'refundAmount',
            key: 'refundAmount',
            render: function render(text, record, index) {
              return renderContent(convertPrice(text), record, index);
            }
          },
          {
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            render: function render(text, record, index) {
              return renderContent(convertTime(text), record, index);
            }
          },
          {
            title: '售后完成时间',
            dataIndex: 'finishTime',
            key: 'finishTime',
            render: function render(text, record, index) {
              return renderContent(convertTime(text), record, index);
            }
          }
        ];
        var feeListColumn = [
          {
            title: '售后单号',
            dataIndex: 'serviceId',
            key: 'serviceId'
          },
          {
            title: '原始订单号',
            dataIndex: 'orderId',
            key: 'orderId'
          },
          {
            title: '项目名',
            dataIndex: 'feeName',
            key: 'feeName'
          },
          {
            title: '费用调整额',
            dataIndex: 'feeAmount',
            key: 'feeAmount',
            render: function render(value, row, index) {
              return convertPrice(value);
            }
          },
          {
            title: '生成时间',
            dataIndex: 'createdTime',
            key: 'createdTime',
            render: function render(value, row, index) {
              return convertTime(value);
            }
          },
          {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
          },
          {
            title: '附件',
            dataIndex: 'attachment',
            key: 'attachment',
            render: function render(text, record) {
              return text
                ? /*#__PURE__*/ React.createElement(
                    'div',
                    null,
                    /*#__PURE__*/ React.createElement(
                      'a',
                      {
                        href: 'javascript:;',
                        className: 'nowrap-text a-my-theme',
                        onClick: function onClick() {
                          return window.open(text);
                        }
                      },
                      _this2.resolveAttachment(text),
                      /*#__PURE__*/ React.createElement(_Icon, {
                        className: 'margin-left-4',
                        type: 'download',
                        theme: 'outlined'
                      })
                    )
                  )
                : '无附件';
            }
          }
        ];
        var couponListColumn = [
          {
            title: '兑换码',
            dataIndex: 'code',
            key: 'code'
          },
          {
            title: '关联订单号',
            dataIndex: 'orderId',
            key: 'orderId'
          },
          {
            title: '商品名称',
            dataIndex: 'productName',
            key: 'productName'
          },
          {
            title: '规格',
            dataIndex: 'skuName',
            key: 'skuName'
          },
          {
            title: '核销数量',
            dataIndex: 'exchangeNum',
            key: 'exchangeNum'
          },
          {
            title: '结算价',
            dataIndex: 'costPrice',
            key: 'costPrice',
            render: function render(value, row, index) {
              return convertPrice(value);
            }
          },
          {
            title: '核销结算额',
            dataIndex: 'exchangeAmount',
            key: 'exchangeAmount',
            render: function render(value, row, index) {
              return convertPrice(value);
            }
          },
          {
            title: '核销时间',
            dataIndex: 'exchangeTime',
            key: 'exchangeTime',
            render: function render(value, row, index) {
              return convertTime(value);
            }
          },
          {
            title: '核销门店',
            dataIndex: 'storeName',
            key: 'storeName'
          }
        ];
        var cardListColumn = [
          {
            title: '核销记录编号',
            dataIndex: 'consumeOrderId',
            key: 'consumeOrderId'
          },
          {
            title: '核销金额',
            dataIndex: 'consumeAmount',
            key: 'consumeAmount',
            render: function render(value, row, index) {
              return convertPrice(value);
            }
          },
          {
            title: '折扣率',
            dataIndex: 'consumeRate',
            key: 'consumeRate'
          },
          {
            title: '核销结算额',
            dataIndex: 'cardSettlementAmount',
            key: 'cardSettlementAmount',
            render: function render(value, row, index) {
              return convertPrice(value);
            }
          },
          {
            title: '核销时间',
            dataIndex: 'consumeTime',
            key: 'consumeTime',
            render: function render(value, row, index) {
              return convertTime(value);
            }
          },
          {
            title: '核销门店',
            dataIndex: 'storeName',
            key: 'storeName'
          }
        ];
        return {
          orderListColumn: orderListColumn,
          serviceListColumn: serviceListColumn,
          feeListColumn: feeListColumn,
          couponListColumn: couponListColumn,
          cardListColumn: cardListColumn
        };
      }
      /** 截取文件名显示 */
    },
    {
      key: 'resolveAttachment',
      value: function resolveAttachment(url) {
        if (url && url.lastIndexOf('/') !== -1) {
          return url.substring(url.lastIndexOf('/') + 1, url.length);
        }

        return url;
      }
    },
    {
      key: 'changePage',
      value: function changePage(current, size) {
        var oldSize = this.pageSize;
        this.pageSize = size;
        var currentPage = oldSize === size ? current : 1;
        this.props.onPageChange(currentPage, size);
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
        var _this$props = this.props,
          children = _this$props.children,
          loading = _this$props.loading,
          dataSourceList = _this$props.dataSourceList;
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'table-container'
          },
          children,
          /*#__PURE__*/ React.createElement(
            _Col,
            {
              className: 'unit-text'
            },
            /*#__PURE__*/ React.createElement(
              'span',
              null,
              '\u91D1\u989D\u5355\u4F4D\uFF08\u5143\uFF09'
            )
          ),
          /*#__PURE__*/ React.createElement(_Table, {
            bordered: true,
            className: 'small-table',
            loading: loading,
            columns: this.generateColumn(),
            dataSource: dataSourceList,
            pagination: false
          }),
          /*#__PURE__*/ React.createElement(_Pagination, {
            showSizeChanger: true,
            defaultPageSize: this.pageSize,
            current: this.props.currentPage,
            total: this.props.total || 0,
            onChange: this.changePage,
            onShowSizeChange: this.changePage,
            showTotal: this.showTotal.bind(this),
            style: {
              marginTop: 15,
              textAlign: 'right'
            }
          })
        );
      }
    }
  ]);

  return TableItem;
})(React.Component);

export default TableItem;

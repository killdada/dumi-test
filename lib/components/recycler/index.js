'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _recyclerView = _interopRequireDefault(require('./recycler-view.jsx'));

var _index = require('../../utils/index');

var _const = require('./const');

var Service = {}; // import Service from '../../service/settlement/bill';

function decorator(target) {
  target.prototype.$platform = _const.PLATFORM.scm;
  target.prototype.$ToolUtil = {
    convertPrice: _index.priceConversion,
    convertOrderType: _index.resolveOrderType,
    convertTime: _index.timeToMinute,
    convertServiceType: _index.resolveServiceType,
    filterRequestArgs: _index.filterRequestArgs
  };
  target.prototype.$Api = {
    getOrderList: Service.orderList,
    getServiceList: Service.serviceList,
    getFeeList: Service.feeList,
    getCouponConsumeList: Service.couponConsumeList,
    getCardConsumeList: Service.cardConsumeList
  };
}

var _default = (0, _recyclerView.default)(decorator);

exports.default = _default;

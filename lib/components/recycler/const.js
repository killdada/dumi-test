'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.TAB_CARD_CONSUME = exports.TAB_COUPON_CONSUME = exports.TAB_FEE = exports.TAB_SERVICE = exports.TAB_ORDER = exports.PLATFORM = void 0;

/**
 * 平台
 * supplier：供应商
 * scm： 供应链
 */
var PLATFORM = {
  supplier: 1,
  scm: 2
};
/**
 * tab 类型
 * TAB_ORDER：商品订单
 * TAB_SERVICE：退货单
 * TAB_FEE：费用调整
 * TAB_COUPON_CONSUME：电子券核销
 * TAB_CARD_CONSUME：卡核销
 */

exports.PLATFORM = PLATFORM;
var TAB_ORDER = 1;
exports.TAB_ORDER = TAB_ORDER;
var TAB_SERVICE = 9998;
exports.TAB_SERVICE = TAB_SERVICE;
var TAB_FEE = 9999;
exports.TAB_FEE = TAB_FEE;
var TAB_COUPON_CONSUME = 2;
exports.TAB_COUPON_CONSUME = TAB_COUPON_CONSUME;
var TAB_CARD_CONSUME = 3;
exports.TAB_CARD_CONSUME = TAB_CARD_CONSUME;

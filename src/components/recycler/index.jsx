import CreateRecycler, { PLATFORM } from './RecyclerView';
import {
  priceConversion,
  resolveOrderType,
  timeToMinute,
  resolveServiceType,
  filterRequestArgs
} from '../../util/function';
import Service from '../../service/settlement/bill';
function decorator(target) {
  target.prototype.$platform = PLATFORM.scm;
  target.prototype.$ToolUtil = {
    convertPrice: priceConversion,
    convertOrderType: resolveOrderType,
    convertTime: timeToMinute,
    convertServiceType: resolveServiceType,
    filterRequestArgs: filterRequestArgs
  };
  target.prototype.$Api = {
    getOrderList: Service.orderList,
    getServiceList: Service.serviceList,
    getFeeList: Service.feeList,
    getCouponConsumeList: Service.couponConsumeList,
    getCardConsumeList: Service.cardConsumeList
  };
}
export default CreateRecycler(decorator);

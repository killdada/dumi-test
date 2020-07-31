'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.regeoCode = exports.placeSearch = exports.placeSearchNearby = exports.setupMap = exports.getLnglat = exports.Arraytostring = exports.stringtoArray = void 0;

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _querystring = _interopRequireDefault(require('querystring'));

var _underscore = _interopRequireDefault(require('underscore'));

var _loader = require('./loader');

var config = {
  v: '1.4.15',
  key: 'd3a562834fc3c90bc7673834e478bd08',
  plugin: 'AMap.Geolocation,AMap.Marker,AMap.PlaceSearch,AMap.PolyEditor,AMap.MouseTool'
};
var SDK = 'https://webapi.amap.com/maps?';
var UISDK = 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11';

var stringtoArray = function stringtoArray(value) {
  if (typeof value !== 'string') return value;
  var res = value
    .slice(1, -1)
    .replace(/],/g, ']~')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .split('~');
  res = res.map(function(n) {
    return n
      .replace(/ /g, '')
      .split(',')
      .map(function(v) {
        return parseFloat(v);
      });
  });
  return res;
};

exports.stringtoArray = stringtoArray;

var Arraytostring = function Arraytostring(arr) {
  var tmp = _underscore.default.map(arr, function(item) {
    return '['.concat(item.toString(), ']');
  });

  return '['.concat(tmp.join(','), ']');
};

exports.Arraytostring = Arraytostring;

var getLnglat = function getLnglat(lnglat) {
  var longitude = lnglat.longitude,
    latitude = lnglat.latitude;
  if (!longitude || !latitude) return [0, 0];
  var result = [longitude, latitude];
  return result;
};

exports.getLnglat = getLnglat;

var setupMap = function setupMap() {
  if (window.AMap) {
    console.warn('amap exist');
    return;
  }

  console.warn('amap loading...');
  (0, _loader.jsLoader)(''.concat(SDK).concat(_querystring.default.stringify(config)), function(
    err,
    Script
  ) {
    if (err) {
      return console.warn('amap sdk load fail');
    }

    (0, _loader.jsLoader)(''.concat(UISDK), function(err, script) {
      if (err) {
        return console.warn('amap ui sdk load fail');
      }

      console.warn('amap load success');
    });
  });
}; // setupMap()
// export const resetMap = () => {
//   /* eslint-disable-next-line */
//   this.map && this.map().destroy;
// };

/**
 *
 * @param {Number} pageSize 单页显示结果条数
 * @param {String} keyword 关键字
 * @param {LngLat} cpoint 中心点经纬度
 * @param {Number} radius 半径,取值范围：0-50000
 * @param {String} type 兴趣点类别， 默认值：餐饮服务、商务住宅、生活服务
 */

exports.setupMap = setupMap;

var placeSearchNearby = function placeSearchNearby(_ref) {
  var _ref$pageSize = _ref.pageSize,
    pageSize = _ref$pageSize === void 0 ? 5 : _ref$pageSize,
    _ref$keyword = _ref.keyword,
    keyword = _ref$keyword === void 0 ? '' : _ref$keyword,
    cpoint = _ref.cpoint,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? 200 : _ref$radius,
    type = _ref.type;
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      AMap.service('AMap.PlaceSearch', function() {
        var placeSearch = new AMap.PlaceSearch({
          type: type || '餐饮服务|商务住宅|生活服务',
          pageSize: pageSize,
          // 单页显示结果条数
          pageIndex: 1,
          // 页码
          autoFitView: true,
          // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          extensions: 'all' // 返回基本+详细信息
        });
        placeSearch.searchNearBy(keyword, cpoint, radius, function(status, result) {
          console.log('nearby', status, result);

          if (status === 'complete' && result.info === 'OK') {
            return resolve(result.poiList.pois);
          }

          return reject([]);
        });
      });
    }, 100);
  });
};
/**
 * @param {Object} query 地址查询条件
 */

exports.placeSearchNearby = placeSearchNearby;

var placeSearch = function placeSearch(query, type) {
  var PlaceSearchOptions = {
    citylimit: true,
    // 是否强制限制在设置的城市内搜索，默认值为：false
    type: type || '餐饮服务|商务住宅|生活服务',
    city: '全国',
    // 兴趣点城市
    pageSize: 5,
    // 单页显示结果条数
    pageIndex: 1,
    // 页码
    autoFitView: true,
    // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    extensions: 'all' // 返回基本+详细信息
  };
  console.log(
    (0, _objectSpread2.default)((0, _objectSpread2.default)({}, PlaceSearchOptions), query)
  );
  return new Promise(function(resolve, reject) {
    AMap.service('AMap.PlaceSearch', function() {
      var placeSearch = new AMap.PlaceSearch(
        (0, _objectSpread2.default)((0, _objectSpread2.default)({}, PlaceSearchOptions), query)
      );
      placeSearch.search(query.keyword, function(status, result) {
        console.log('search', status, result);

        if (status === 'complete' && result.info === 'OK') {
          return resolve(query.keyword && result.poiList.pois);
        }

        return reject([]);
      });
    });
  });
};

exports.placeSearch = placeSearch;

var regeoCode = function regeoCode(lnglat, type) {
  var GeocoderOptions = {
    citylimit: true,
    // 是否强制限制在设置的城市内搜索，默认值为：false
    type: type || '餐饮服务|商务住宅|生活服务',
    city: '全国',
    // 兴趣点城市
    pageSize: 5,
    // 单页显示结果条数
    pageIndex: 1,
    // 页码
    autoFitView: true,
    // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    extensions: 'all' // 返回基本+详细信息
  };
  console.log('regeoCode lnglat', lnglat);
  return new Promise(function(resolve, reject) {
    AMap.plugin('AMap.Geocoder', function() {
      var geocoder = new AMap.Geocoder((0, _objectSpread2.default)({}, GeocoderOptions));
      geocoder.getAddress(lnglat, function(status, result) {
        if (status === 'complete' && result.regeocode) {
          console.log('@#$%@#$$', result);
          var pois = result.regeocode.pois;
          return resolve(pois);
        }

        return reject([]);
      });
    });
  });
};

exports.regeoCode = regeoCode;

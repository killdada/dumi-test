'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

require('antd/es/breadcrumb/style');

var _breadcrumb = _interopRequireDefault(require('antd/es/breadcrumb'));

require('antd/es/button/style');

var _button = _interopRequireDefault(require('antd/es/button'));

var _react = _interopRequireDefault(require('react'));

var BreadcrumbHeader = function BreadcrumbHeader(props) {
  var styles = {
    minHeight: 50,
    width: '100%',
    backgroundColor: 'white',
    padding: '10px 32px',
    borderBottom: '1px solid #F0F2F5',
    borderTop: '1px solid #F0F2F5'
  };
  var childStyle = {
    width: '50%',
    display: 'inline-block'
  };
  var gobackStyle = {
    marginBottom: '10px'
  };

  function goback() {
    window.history.back();
  }

  return /*#__PURE__*/ _react.default.createElement(
    'div',
    {
      style: styles
    },
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: childStyle
      },
      props.isShowGoback
        ? /*#__PURE__*/ _react.default.createElement(
            _button.default,
            {
              onClick: goback,
              style: gobackStyle
            },
            '\u8FD4\u56DE'
          )
        : null,
      /*#__PURE__*/ _react.default.createElement(
        _breadcrumb.default,
        null,
        props.BreadcrumbList.map(function(item, index) {
          return /*#__PURE__*/ _react.default.createElement(
            _breadcrumb.default.Item,
            {
              key: index
            },
            item.moduleRoute
              ? /*#__PURE__*/
                // <Link to={item.moduleRoute}>{item.moduleName}</Link>
                _react.default.createElement(
                  'a',
                  {
                    href: item.moduleRoute
                  },
                  item.moduleName
                )
              : item.moduleName
          );
        })
      )
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: (0, _objectSpread2.default)(
          (0, _objectSpread2.default)({}, childStyle),
          {},
          {
            textAlign: 'right'
          }
        )
      },
      props.children
    )
  );
};

var _default = BreadcrumbHeader;
exports.default = _default;

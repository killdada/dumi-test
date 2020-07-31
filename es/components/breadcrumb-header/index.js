import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import 'antd/es/breadcrumb/style';
import _Breadcrumb from 'antd/es/breadcrumb';
import 'antd/es/button/style';
import _Button from 'antd/es/button';
import React from 'react';

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

  return /*#__PURE__*/ React.createElement(
    'div',
    {
      style: styles
    },
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: childStyle
      },
      props.isShowGoback
        ? /*#__PURE__*/ React.createElement(
            _Button,
            {
              onClick: goback,
              style: gobackStyle
            },
            '\u8FD4\u56DE'
          )
        : null,
      /*#__PURE__*/ React.createElement(
        _Breadcrumb,
        null,
        props.BreadcrumbList.map(function(item, index) {
          return /*#__PURE__*/ React.createElement(
            _Breadcrumb.Item,
            {
              key: index
            },
            item.moduleRoute
              ? /*#__PURE__*/
                // <Link to={item.moduleRoute}>{item.moduleName}</Link>
                React.createElement(
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
    /*#__PURE__*/ React.createElement(
      'div',
      {
        style: _objectSpread(
          _objectSpread({}, childStyle),
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

export default BreadcrumbHeader;

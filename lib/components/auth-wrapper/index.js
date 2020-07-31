'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = AuthWrapper;
exports.AuthCheck = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var isArray =
  Array.isArray ||
  function(obj) {
    return toString.call(obj) === '[object Array]';
  };

function AuthWrapper(props) {
  try {
    if (isArray(props.children)) {
      console.error(
        'AuthWrapper Error: There must be only one child in AuthWrapper, but got ' +
          props.children.length +
          ' children'
      );
      return null;
    }

    var rule = props.rule,
      roleId = props.roleId;
    var R = rule.get(roleId);
    /* Did not set rule for this role */

    if (R === undefined) {
      return props.children;
    }

    var isShow = R.isShow,
      disabled = R.disabled;
    if (!isShow) return null;

    if (typeof props.children === 'string') {
      return props.children;
    }

    var CP = props.children.props;
    /* AuthWrapper will overwrite disabled prop, if setted disable rule is true. */

    if (CP.hasOwnProperty('disabled') && disabled === true) {
      console.warn(
        "AuthWrapper Warnning: Children's porps 'disabled' would be overwrite by AuthWrapper.'"
      );
    }

    var DP =
      disabled === true
        ? {
            disabled: disabled
          }
        : {};
    return _react.default.cloneElement(props.children, DP);
  } catch (e) {
    console.error('AuthWrapper Error: ', e);
    return null;
  }
}

AuthWrapper.propTypes = {
  rule: _propTypes.default.instanceOf(Map).isRequired,
  roleId: _propTypes.default.number.isRequired
};

var AuthCheck = function AuthCheck(_ref) {
  var rule = _ref.rule,
    roleId = _ref.roleId;
  var R = rule.get(roleId);

  if (R === undefined) {
    return {
      isShow: true,
      disabled: false
    };
  }

  return R;
};

exports.AuthCheck = AuthCheck;

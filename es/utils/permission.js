import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
export var ROLE_ID_LIST = {
  superadmin: 1,
  // admin
  purchase: 2,
  // 采购专员
  supplymanager: 3,
  // 供应链主管
  supply: 4,
  // 供应链专员
  treasury: 5,
  // 财务专员
  warehouseadmin: 6,
  // 仓库主管
  warehouse: 7,
  // 仓库专员
  operation: 8,
  // 运营专员
  cinemaaccountmng: 9,
  // 院线账号管理员
  resource: 13,
  // 资源部专员
  resourcemng: 19 // 资源部主管
};
var ATTR_ID_LIST = {
  storehouseId: 1
};

var resoloveMenus = function resoloveMenus(menus) {
  var res = [];

  var _iterator = _createForOfIteratorHelper(menus),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var v = _step.value;

      if (v.isLeaf === 0 && v.submenus.length === 0) {
        continue;
      }

      var childrenNode = [];

      if (!v.isLeaf) {
        childrenNode = resoloveMenus(v.submenus);

        if (childrenNode.length === 0) {
          continue;
        }
      }

      if (!v.enabled) continue;
      res.push({
        name: v.name,
        id: v.id,
        source: v.source || '/ver1',
        route: v.route,
        isLeaf: !!v.isLeaf,
        submenus: childrenNode
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return res;
};

var Permissions = /*#__PURE__*/ (function() {
  function Permissions() {
    _classCallCheck(this, Permissions);

    this.roleId = '';
    this.roleName = '';
    this.attrs = [];
    this.accountControlRoles = [];
    this.menus = [];
    this.userId = '';
    this.userName = '';
  }

  _createClass(Permissions, [
    {
      key: 'savePermissions',
      value: function savePermissions(permissionList, user) {
        var roleId = permissionList.roleId,
          roleName = permissionList.roleName,
          attrs = permissionList.attrs,
          menus = permissionList.menus,
          accountControlRoles = permissionList.accountControlRoles;
        var accountName = user.accountName,
          id = user.id;
        this.roleId = roleId;
        this.roleName = roleName;
        this.attrs = attrs;
        this.accountControlRoles = accountControlRoles;
        this.menus = resoloveMenus(menus);
        this.userId = id;
        this.userName = accountName;
      }
    },
    {
      key: 'getUserInfo',
      value: function getUserInfo() {
        return {
          userId: this.userId,
          userName: this.userName
        };
      }
    },
    {
      key: 'getRole',
      value: function getRole() {
        return {
          roleId: this.roleId,
          roleName: this.roleName
        };
      }
    },
    {
      key: 'getMenu',
      value: function getMenu() {
        return this.menus;
      }
    },
    {
      key: 'getCountrolRoles',
      value: function getCountrolRoles() {
        return this.accountControlRoles;
      }
    },
    {
      key: 'getAttr',
      value: function getAttr(attrId) {
        if (attrId === 'storehouseId') {
          attrId = ATTR_ID_LIST.storehouseId;
        }

        var result;

        if (!this.attrs || this.attrs.length === 0) {
          return '';
        }

        this.attrs.forEach(function(attr) {
          if (attr.attrId === attrId) {
            result = attr;
          }
        });
        if (!result) return console.warn('attr不存在');

        if (result.attrStyle === 0) {
          // 文本
          return result.attrValues.length ? result.attrValues[0] : '';
        } else if (result.attrStyle === 1) {
          // 单选
          return result.attrValues.length ? result.attrValues[0] : '';
        } else if (result.attrStyle === 2) {
          // 多选
          var tmp = {};
          tmp[result.attrName] = result.attrValues;
          return tmp;
        }
      }
    },
    {
      key: 'isSuperadmin',
      value: function isSuperadmin() {
        return this.roleId === ROLE_ID_LIST.superadmin;
      }
    },
    {
      key: 'isSupplymanager',
      value: function isSupplymanager() {
        return this.roleId === ROLE_ID_LIST.supplymanager;
      }
    },
    {
      key: 'isTreasury',
      value: function isTreasury() {
        return this.roleId === ROLE_ID_LIST.treasury;
      }
    },
    {
      key: 'isWarehouse',
      value: function isWarehouse() {
        return this.roleId === ROLE_ID_LIST.warehouse;
      }
    },
    {
      key: 'isWarehouseadmin',
      value: function isWarehouseadmin() {
        return this.roleId === ROLE_ID_LIST.warehouseadmin;
      }
    }
  ]);

  return Permissions;
})();

export var permissions = new Permissions();

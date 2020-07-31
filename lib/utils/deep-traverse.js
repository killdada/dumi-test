'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = deepTraverse;

function deepTraverse(menus) {
  var arr = [];

  for (var i = 0; i < menus.length; i++) {
    if (menus[i].submenus) {
      for (var j = 0; j < menus[i].submenus.length; j++) {
        if (menus[i].submenus[j].submenus) {
          for (var k = 0; k < menus[i].submenus[j].submenus.length; k++) {
            // eslint-disable-next-line max-depth
            if (menus[i].submenus[j].submenus[k].isLeaf) {
              arr.push(menus[i].submenus[j].submenus[k]);
            }
          }
        }
      }
    }
  }

  return arr;
}

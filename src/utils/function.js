import _ from 'underscore';
import cloneDeep from 'lodash/cloneDeep';

export function obj2key(obj, keys) {
  let n = keys.length;
  let key = [];
  while (n--) {
    key.push(obj[keys[n]]);
  }
  return key.join('|');
}

export function uniqeByKeys(array, keys) {
  let arr = [];
  let hash = {};
  for (let i = 0, j = array.length; i < j; i++) {
    let k = obj2key(array[i], keys);
    if (!(k in hash)) {
      hash[k] = true;
      arr.push(array[i]);
    }
  }
  return arr;
}

export function incrementalArray(length) {
  return Array.from({ length }).map((v, k) => k);
}

export function numberNegative(n) {
  return n === '0' ? '0' : `-${n}`;
}

/**
 * 过滤空参、null、undefined、NaN，不过滤 0
 */
export function filterRequestArgs(args) {
  return _.omit(args, (value) => {
    return !value && value !== 0;
  });
}

export { cloneDeep };

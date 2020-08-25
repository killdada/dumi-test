import _ from 'lodash';

const store = window.localStorage;

function get(key) {
  const value = store.getItem(key);
  if (value && _.isString(value)) {
    try {
      return JSON.parse(value);
    } catch (e) {
      // do nothing
    }
  }
  return value;
}

function set(key, value) {
  if (value && _.isObject(value)) {
    value = JSON.stringify(value);
  }
  store.setItem(key, value);
}

export function getItem(key, defaultValue) {
  return get(key) || defaultValue;
}

export function setItem(key, value) {
  return set(key, value);
}

export function removeItem(key) {
  return store.removeItem(key);
}

export function clear(key) {
  return store.clear();
}

const localStorage = {
  getItem,
  setItem,
  removeItem,
  clear
};

export { localStorage };

export default localStorage;

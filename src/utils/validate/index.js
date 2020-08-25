export function isNumberAndletter(value) {
  let reg = /^[A-Za-z0-9]+$/;
  if (!reg.test(value)) {
    return false;
  } else {
    return true;
  }
}

export function checkMobile(value) {
  return /^1(2|3|4|5|6|7|8|9)\d{9}$/.test(value);
}

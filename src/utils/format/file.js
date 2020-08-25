export function formatFileName(str) {
  return str.substring(str.lastIndexOf('/') + 15);
}

export function formatPublicFileName(str) {
  return str.substring(str.lastIndexOf('/') + 15);
}

export function fileName(str) {
  if (str.substring(str.lastIndexOf('/') + 1).length < 15) {
    return str.substring(str.lastIndexOf('/') + 1);
  } else {
    return str.substring(str.lastIndexOf('/') + 15);
  }
}

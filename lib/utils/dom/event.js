'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.stopPropagation = stopPropagation;
exports.preventDefault = preventDefault;

function stopPropagation(event) {
  event.stopPropagation();
}

function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

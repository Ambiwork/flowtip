import { Rect } from 'flowtip-core';
export function findAncestor(callback, node) {
  var current = node;

  while (current instanceof HTMLElement) {
    if (callback(current)) {
      return current;
    }

    current = current.parentNode;
  }

  return null;
}
export function getBorders(node) {
  var style = getComputedStyle(node);
  var top = parseInt(style.borderTopWidth, 10);
  var right = parseInt(style.borderRightWidth, 10);
  var bottom = parseInt(style.borderBottomWidth, 10);
  var left = parseInt(style.borderLeftWidth, 10);
  return {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
}
export function getClippingBlock(node) {
  var result = findAncestor(function (node) {
    if (node === document.documentElement) return true;
    var style = getComputedStyle(node);
    return style.overflow && style.overflow !== 'visible';
  }, node);
  if (result) return result;
  if (document.documentElement !== null) return document.documentElement;
  throw new Error('document.documentElement is null');
}
export function getContainingBlock(node) {
  var result = findAncestor(function (node) {
    if (node === document.documentElement) return true;
    var style = getComputedStyle(node);
    return style.position && style.position !== 'static';
  }, node);
  if (result) return result;
  if (document.documentElement !== null) return document.documentElement;
  throw new Error('document.documentElement is null');
}
export function getContentRect(node) {
  var rect = node.getBoundingClientRect();
  var border = getBorders(node);
  return new Rect(rect.left + border.left || 0, rect.top + border.top || 0, Math.min(rect.width - border.left - border.right, node.clientWidth) || 0, Math.min(rect.height - border.top - border.bottom, node.clientHeight) || 0);
}
export function getViewportRect() {
  return new Rect(0, 0, window.innerWidth, window.innerHeight);
}
//# sourceMappingURL=dom.js.map
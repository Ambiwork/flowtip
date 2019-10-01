"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var areEqualDimensions = function areEqualDimensions(a, b) {
  if (a === b) return true;

  if ((a === null || a === undefined) && (b === null || b === undefined)) {
    return true;
  }

  if (a === null || a === undefined || b === null || b === undefined) {
    return false;
  }

  return a.width === b.width && a.height === b.height;
};

var _default = areEqualDimensions;
exports.default = _default;
//# sourceMappingURL=areEqualDimensions.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flowtip = require("../flowtip");

var getClampedTailPosition = function getClampedTailPosition(result, tail, tailOffset) {
  var region = result.region,
      rect = result.rect,
      overlapCenter = result.overlapCenter;
  var offset;
  var range;

  if (region === _flowtip.RIGHT || region === _flowtip.LEFT) {
    offset = tail.height / 2;
    range = rect.height;
  } else {
    // Position is top or bottom.
    offset = tail.width / 2;
    range = rect.width;
  }

  var min = offset + tailOffset;
  var max = range - min;
  return Math.min(max, Math.max(min, overlapCenter)) - offset;
};

var _default = getClampedTailPosition;
exports.default = _default;
//# sourceMappingURL=getClampedTailPosition.js.map
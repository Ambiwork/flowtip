import { LEFT, RIGHT } from "../flowtip";

var getClampedTailPosition = function getClampedTailPosition(result, tail, tailOffset) {
  var region = result.region,
      rect = result.rect,
      overlapCenter = result.overlapCenter;
  var offset;
  var range;

  if (region === RIGHT || region === LEFT) {
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

export default getClampedTailPosition;
//# sourceMappingURL=getClampedTailPosition.js.map
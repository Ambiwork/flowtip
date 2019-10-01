"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.END = exports.CENTER = exports.START = exports.LEFT = exports.BOTTOM = exports.RIGHT = exports.TOP = void 0;

var _Rect = _interopRequireDefault(require("./Rect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOP = 'top';
exports.TOP = TOP;
var RIGHT = 'right';
exports.RIGHT = RIGHT;
var BOTTOM = 'bottom';
exports.BOTTOM = BOTTOM;
var LEFT = 'left';
exports.LEFT = LEFT;
var START = 'start';
exports.START = START;
var CENTER = 'center';
exports.CENTER = CENTER;
var END = 'end';
/**
 * Get the position of the content rect when moved into the supplied region and
 * aligned with `config.align`. The returned rect represents the ideal content
 * position before any boundary constrains are applied.
 *
 * The `config.align` value determines how the content rect will be positioned
 * relative to the target rect. A `conifg.align` value of 0 will align it to the
 * start (left or top) of the target while a value of 1 will align the rect to
 * the end (right or bottom). A value of 0.5 will center align it in every
 * orientation.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @returns {Object} A rect object.
 */

exports.END = END;

function getRect(config, region) {
  var target = config.target,
      content = config.content,
      align = config.align,
      offset = config.offset;
  var left;
  var top;

  if (region === TOP || region === BOTTOM) {
    left = target.left + (target.width - content.width) * align;

    if (region === TOP) {
      top = target.top - content.height - offset;
    } else {
      // Region is bottom.
      top = target.bottom + offset;
    }
  } else {
    // Region is left or right.
    top = target.top + (target.height - content.height) * align;

    if (region === LEFT) {
      left = target.left - content.width - offset;
    } else {
      // Region is right.
      left = target.right + offset;
    }
  }

  return new _Rect.default(left, top, content.width, content.height);
}
/**
 * Calculate the final effective bounds of the positioned content rect for a
 * given region.
 *
 * This calculation uses the maximum of the target offset and edge offset config
 * values as the offset along the edge of the content facing the target. This
 * prevents the content from being offset from the boundary edge by both offset
 * amounts (the target offset is used to provide space for an indicator triangle
 * and only applies in the direction facing the target).
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @returns {Object} A rect object
 */


function getOffsetBounds(config, region) {
  var bounds = config.bounds,
      edgeOffset = config.edgeOffset,
      offset = config.offset;
  var maxOffset = Math.max(offset, edgeOffset);
  var left = bounds.left + (region === RIGHT ? maxOffset : edgeOffset);
  var top = bounds.top + (region === BOTTOM ? maxOffset : edgeOffset);
  var right = bounds.right - (region === LEFT ? maxOffset : edgeOffset);
  var bottom = bounds.bottom - (region === TOP ? maxOffset : edgeOffset);
  return new _Rect.default(left, top, right - left, bottom - top);
}
/**
 * Get the updated left position of the content rect with boundary constraints
 * applied.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @param   {Object} offsetBounds A final bounds rect for the current region.
 * @param   {Object} rect A content rect object.
 * @returns {number} A new left position for the content rect.
 */


function constrainLeft(config, region, offsetBounds, rect) {
  var constrain = config.constrain,
      bounds = config.bounds; // Center align the content rect if is wider than the bounds rect.

  if (constrain.left && constrain.right && rect.width > offsetBounds.width) {
    return bounds.left + (bounds.width - rect.width) / 2;
  } // If either the left or right edge of the content rect is outside the bounds
  // rect, position it on the edge. Only one of these cases can be true since
  // the content is not wider than the bounds.


  if (constrain.left && rect.left < offsetBounds.left) {
    return offsetBounds.left;
  }

  if (constrain.right && rect.right > offsetBounds.left + offsetBounds.width) {
    return offsetBounds.right - rect.width;
  }

  return rect.left;
}
/**
 * Get the updated top position of the content rect with boundary constraints
 * applied.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @param   {Object} offsetBounds A final bounds rect for the current region.
 * @param   {Object} rect A content rect object.
 * @returns {number} A new top position for the content rect.
 */


function constrainTop(config, region, offsetBounds, rect) {
  var constrain = config.constrain,
      bounds = config.bounds; // Center align the content rect if is taller than the bounds rect.

  if (constrain.top && constrain.bottom && rect.height > offsetBounds.height) {
    return bounds.top + (bounds.height - rect.height) / 2;
  } // If either the left or right edge of the content rect is outside the bounds
  // rect, position it on the edge. Only one of these cases can be true since
  // the content is not taller than the bounds.


  if (constrain.top && rect.top < offsetBounds.top) {
    return offsetBounds.top;
  }

  if (constrain.bottom && rect.bottom > offsetBounds.bottom) {
    return offsetBounds.bottom - rect.height;
  }

  return rect.top;
}
/**
 * Check if the content will be clipped by the boundary edge if placed in a
 * region.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`)
 * @returns {Object} Clipped regions (`{top, right, bottom, left}`).
 */


function getRegionClip(config, region) {
  var rect = getRect(config, region);
  var offsetBounds = getOffsetBounds(config, region);
  return {
    top: rect.top < offsetBounds.top,
    right: offsetBounds.right < rect.right,
    bottom: offsetBounds.bottom < rect.bottom,
    left: rect.left < offsetBounds.left
  };
}
/**
 * Calculate which regions are valid for the content rect to occupy.
 * This function measures the available space around the target rect within the
 * container rect. Any region with sufficient space to display the content rect
 * without clipping is set to `true`.
 *
 * This function checks the margins between the target rect and the bounds rect
 * in every region when offset from the the target. If a margin is smaller than
 * the width or height of the height of the content rect, that region is not
 * valid.
 *
 *  _________________________________________________________________
 * |                   ^                                             |
 * |                   |                                             |
 * |                  top                                            |
 * |                 margin   |‾‾‾‾‾‾‾‾‾‾‾|                          |
 * |                   |      |  content  |                          |
 * |                  _V_ _ _ |___________|    |<----right-margin--->|
 * |                                |          |                     |
 * |         |‾‾‾‾‾‾‾‾‾‾‾|     _____|_____     |‾‾‾‾‾‾‾‾‾‾‾|         |
 * |         |  content  |----|  target   |----|  content  |         |
 * |         |___________|     ‾‾‾‾‾|‾‾‾‾‾     |___________|         |
 * |                     |          |                                |
 * |<----left-margin---->|    |‾‾‾‾‾‾‾‾‾‾‾| ‾ ‾<- bottom margin      |
 *  ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|  content  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 *                            |___________|
 * > bottom margin is smaller than the content height, this region is disabled
 *
 * In addition to checking the margins, this function also checks that enough
 * of the target rect intersects with the bounds rect in each direction to
 * accommodate the `overlap` value set in the config. This calculation allows
 * a region to be considered invalid if there is not enough room to render
 * a caret.
 *
 *               |                                                   |
 *               |<--L-->|------------min-overlap------------|<--R-->|
 *               |                                                   |
 *               |<-left-intersection->|                             |
 *               |                     |                             |
 *               |   __________________|                             |
 *               |  |      target      |                             |
 *               |  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                              |
 *               |  |<--------------right-intersection-------------->|
 *               |           ^                                       |
 *               | |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|                            |
 *               | |       content      |                            |
 *               | |____________________|                            |
 *               |                                                   |
 * > Sufficient intersection at the left and right, the top and bottom
 * > regions are considered valid.
 *
 *               |                                                   |
 *               |<--L-->|------------min-overlap------------|<--R-->|
 *               |                                                   |
 *               |<-->|--left-intersection                           |
 *               |    |                                              |
 *  _____________|____|      |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|                  |
 * |      target      |    < |       content      |                  |
 * |‾‾‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾       |____________________|                  |
 * |             |                                                   |
 * |<------------+----------right-intersection---------------------->|
 *               |                                                   |
 * > Insufficient intersection at the left, the top and bottom regions are
 * > not considered valid. Only the right region is valid.
 *
 * @param   {Object} config FlowTip layout config object.
 * @returns {Object} Valid regions (`{top, right, bottom, left}`).
 */


function getValidRegions(config) {
  var target = config.target,
      overlap = config.overlap,
      offset = config.offset,
      edgeOffset = config.edgeOffset,
      bounds = config.bounds,
      content = config.content,
      constrain = config.constrain;

  var offsetBounds = _Rect.default.grow(bounds, -edgeOffset); // This value is true if `overlap` amount of the target rect intersects
  // the bounds rect in the horizontal direction.


  var topBottomValid = offsetBounds.right - target.left >= overlap && target.right - offsetBounds.left >= overlap; // This value is true if `overlap` amount of the target rect intersects
  // the bounds rect in the vertical direction.

  var leftRightValid = offsetBounds.bottom - target.top >= overlap && target.bottom - offsetBounds.top >= overlap; // Calculate the available space in each region.

  var topMargin = target.top - offsetBounds.top - offset;
  var rightMargin = offsetBounds.right - target.right - offset;
  var bottomMargin = offsetBounds.bottom - target.bottom - offset;
  var leftMargin = target.left - offsetBounds.left - offset;
  var topRegion = getRegionClip(config, TOP);
  var rightRegion = getRegionClip(config, RIGHT);
  var bottomRegion = getRegionClip(config, BOTTOM);
  var leftRegion = getRegionClip(config, LEFT);
  var topClips = !constrain.left && topRegion.left || !constrain.right && topRegion.right;
  var rightClips = !constrain.top && rightRegion.top || !constrain.bottom && rightRegion.bottom;
  var bottomClips = !constrain.left && bottomRegion.left || !constrain.right && rightRegion.bottom;
  var leftClips = !constrain.top && topRegion.top || !constrain.bottom && leftRegion.bottom; // A region is considered valid if the margin is large enough to fit the
  // side of the content rect and if there is enough linear overlap as defined
  // in the config. The overlap check ensures that a region is valid only if
  // there is room to render a caret.

  return {
    top: !topClips && topBottomValid && topMargin >= content.height,
    right: !rightClips && leftRightValid && rightMargin >= content.width,
    bottom: !bottomClips && topBottomValid && bottomMargin >= content.height,
    left: !leftClips && leftRightValid && leftMargin >= content.width
  };
}
/**
 * Get the ideal region to position the content rect. This function returns the
 * region adjacent to the target that has the largest available space.
 *
 * If there are no regions that are large enough to fit the content rect
 * `undefined` is returned.
 *
 *     ___________________________________________________________________
 *    |                      ^                                            |
 *    |                      |                                            |
 *    |                      V                                            |
 *    |                 |‾‾‾‾‾‾‾‾‾‾|                                      |
 *    |                 | content  |                                      |
 *    |                 |__________|                                      |
 *    |   |‾‾‾‾‾‾‾‾‾‾|   ____|_____   |‾‾‾‾‾‾‾‾‾‾|                        |
 *    |<->| content  |--|  target  |--| content  |<---------------------->|
 *    |   |__________|   ‾‾‾‾|‾‾‾‾‾   |__________|                        |
 *    |                 |‾‾‾‾‾‾‾‾‾‾|                                      |
 *    |                 | content  |                                      |
 *    |                 |__________|                                      |
 *    |                      ^                                            |
 *    |                      |                                            |
 *    |                      V                                            |
 *     ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 * > Although all regions are valid, the region with largest available space
 * > (right) returned as the ideal region.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {Object} valid Valid regions (`{top, right, bottom, left}`).
 * @returns {string|undefined} A region (`top`, `right`, `bottom`, or `left`).
 */


function getIdealRegion(config, valid) {
  var target = config.target,
      content = config.content,
      disabled = config.disabled,
      bounds = config.bounds;
  var margin = 0;
  var region = undefined; // Calculate the amount of remaining free space in each region when occupied
  // by the content rect. It is not necessary to factor `offset` into this
  // calculation since it is constant for all regions.

  var topMargin = target.top - bounds.top - content.height;
  var rightMargin = bounds.right - target.right - content.width;
  var bottomMargin = bounds.bottom - target.bottom - content.height;
  var leftMargin = target.left - bounds.left - content.width;

  if (valid.top && !disabled.top && topMargin > margin) {
    margin = topMargin;
    region = TOP;
  }

  if (valid.right && !disabled.right && rightMargin > margin) {
    margin = rightMargin;
    region = RIGHT;
  }

  if (valid.bottom && !disabled.bottom && bottomMargin > margin) {
    margin = bottomMargin;
    region = BOTTOM;
  }

  if (valid.left && !disabled.left && leftMargin > margin) {
    margin = leftMargin;
    region = LEFT;
  }

  return region;
}
/**
 * Resolve a region when the target rect is positioned outside of the bounds
 * rect.
 *
 * This algorithm checks which triangular segment around the bounds rect is
 * occupied and returned the associated region.
 *
 *           \                   top quadrant                  /
 *             \            returns bottom region            /
 *               \                                         /
 *                 \      top-left    |    top-right     /
 *                   \    upper half  |    upper half  /
 *                     \              |              /
 *                       \            |            /
 *                         \__________|__________/
 *               top-left  | \        |        / | top-right
 *  left       lower half  |   \      |      /   | lower half         right
 *  quadrant               |     \    |    /     |                 quadrant
 *  returns   -------------|------+---+---+------|--------------    returns
 *  right                  |     /    |    \     |                     left
 *  region    bottom-left  |   /      |      \   |  bottom-right     region
 *              upper half | /        |        \ |  upper half
 *                         /‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾\
 *                       /            |            \
 *                     /              |              \
 *                   /   bottom-left  |  bottom-right  \
 *                 /      lower half  |  lower half      \
 *               /                                         \
 *             /               bottom quadrant               \
 *           /               returns top region                \
 *
 * > The quadrants are divided at 45 degree angles and extend outward and inward
 * > from each edge.
 *
 * When an edge constraint is disabled, the logic for that quadrant is skipped.
 * The halves of the adjacent quadrants are also skipped.
 *
 * For example, if the bottom constraint is disabled, the bottom halves of the
 * left and right quadrants do not exist. The top halves extend indefinitely
 * downwards so that the top region is never returned when the target rect is
 * not directly below the bounds rect.
 *
 *                       \            |            /
 *                         \__________|__________/
 *               top-left  | \        |        / | top-right
 *  left       lower half  |   \      |      /   | lower half         right
 *  quadrant               |     \    |    /     |                 quadrant
 *  returns   -------------|------+---+---+------|--------------    returns
 *  right                  |                     |                     left
 *  region    bottom-left  |      contrain       |  bottom-right     region
 *              upper half |      disabled       |  upper half
 *                         |‾ ‾ ‾ ‾ ‾ ‾ ‾ ‾ ‾ ‾ ‾|
 *               quadrant  |     handled by      |  quadrant
 *                extents  |   getIdealRegion    |  extends
 *            indefinitely |                     |  indefinitely
 *                         |                     |
 *
 * @param   {Object} config FlowTip layout config object.
 * @returns {string|undefined} A region (`top`, `right`, `bottom`, or `left`).
 */


function getExternalRegion(config) {
  var target = config.target,
      constrain = config.constrain,
      bounds = config.bounds,
      edgeOffset = config.edgeOffset,
      disabled = config.disabled;

  var offsetBounds = _Rect.default.grow(bounds, -edgeOffset);

  var atTop = target.top + target.height / 2 < offsetBounds.top + offsetBounds.height / 2;
  var atLeft = target.left + target.width / 2 < offsetBounds.left + offsetBounds.width / 2;
  var atBottom = !atTop;
  var atRight = !atLeft;
  var topDist = offsetBounds.top - target.bottom;
  var rightDist = target.left - offsetBounds.right;
  var bottomDist = target.top - offsetBounds.bottom;
  var leftDist = offsetBounds.left - target.right;
  var upperTopLeft = atTop && atLeft && topDist >= leftDist;
  var lowerTopLeft = atTop && atLeft && topDist < leftDist;
  var upperTopRight = atTop && atRight && topDist >= rightDist;
  var lowerTopRight = atTop && atRight && topDist < rightDist;
  var lowerBottomRight = atBottom && atRight && bottomDist >= rightDist;
  var upperBottomRight = atBottom && atRight && bottomDist < rightDist;
  var lowerBottomLeft = atBottom && atLeft && bottomDist >= leftDist;
  var upperBottomLeft = atBottom && atLeft && bottomDist < leftDist;

  if (!disabled.top) {
    if (lowerBottomRight && constrain.bottom) return TOP;
    if (lowerBottomRight && !constrain.right) return TOP;
    if (lowerBottomLeft && constrain.bottom) return TOP;
    if (lowerBottomLeft && !constrain.left) return TOP;
    if (upperBottomRight && constrain.bottom && disabled.left) return TOP;
    if (upperBottomLeft && constrain.bottom && disabled.right) return TOP;
    if (upperBottomLeft && !constrain.left && constrain.bottom) return TOP;
    if (upperBottomRight && !constrain.right && constrain.bottom) return TOP;
  }

  if (!disabled.right) {
    if (upperBottomLeft && constrain.left) return RIGHT;
    if (upperBottomLeft && !constrain.bottom) return RIGHT;
    if (lowerTopLeft && constrain.left) return RIGHT;
    if (lowerTopLeft && !constrain.top) return RIGHT;
    if (lowerBottomLeft && constrain.left && disabled.top) return RIGHT;
    if (upperTopLeft && constrain.left && disabled.bottom) return RIGHT;
    if (upperTopLeft && !constrain.top && constrain.left) return RIGHT;
    if (lowerBottomLeft && !constrain.bottom && constrain.left) return RIGHT;
  }

  if (!disabled.bottom) {
    if (upperTopLeft && constrain.top) return BOTTOM;
    if (upperTopLeft && !constrain.left) return BOTTOM;
    if (upperTopRight && constrain.top) return BOTTOM;
    if (upperTopRight && !constrain.right) return BOTTOM;
    if (lowerTopLeft && constrain.top && disabled.right) return BOTTOM;
    if (lowerTopRight && constrain.top && disabled.left) return BOTTOM;
    if (lowerTopRight && !constrain.right && constrain.top) return BOTTOM;
    if (lowerTopLeft && !constrain.left && constrain.top) return BOTTOM;
  }

  if (!disabled.left) {
    if (lowerTopRight && constrain.right) return LEFT;
    if (lowerTopRight && !constrain.top) return LEFT;
    if (upperBottomRight && constrain.right) return LEFT;
    if (upperBottomRight && !constrain.bottom) return LEFT;
    if (upperTopRight && constrain.right && disabled.bottom) return LEFT;
    if (lowerBottomRight && constrain.right && disabled.top) return LEFT;
    if (upperTopRight && !constrain.top && constrain.right) return LEFT;
    if (lowerBottomRight && !constrain.bottom && constrain.right) return LEFT;
  }

  return undefined;
}
/**
 * Get the opposite region of the one provided.
 * i.e. `left` -> `right`, `top` -> `bottom`
 *
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @returns {string} The inverse region.
 */


function invertRegion(region) {
  return {
    top: BOTTOM,
    bottom: TOP,
    left: RIGHT,
    right: LEFT
  }[region];
}
/**
 * Return the default region set in the config, or its inverse if either are
 * valid.
 *
 * Using the inverse helps preserve visual continuity when the content meets the
 * edge of the bounds rect; instead of appearing to rotate 90 degrees around the
 * target, inverting it will cause it to appear to flip, which is more visually
 * appealing.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {Object} valid Valid regions (`{top, right, bottom, left}`).
 * @returns {string|undefined} A region (`top`, `right`, `bottom`, or `left`).
 */


function getDefaultRegion(config, valid) {
  var region = config.region;

  if (typeof region === 'string') {
    if (valid[region] && !config.disabled[region]) {
      return region;
    }
  }

  return undefined;
}
/**
 * Return the default region set in the config, or its inverse if either are
 * valid.
 *
 * Using the inverse helps preserve visual continuity when the content meets the
 * edge of the bounds rect; instead of appearing to rotate 90 degrees around the
 * target, inverting it will cause it to appear to flip, which is more visually
 * appealing.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {Object} valid Valid regions (`{top, right, bottom, left}`).
 * @returns {string|undefined} A region (`top`, `right`, `bottom`, or `left`).
 */


function getInvertDefaultRegion(config, valid) {
  var region = config.region;

  if (typeof region === 'string') {
    var invertedDefault = invertRegion(region);

    if (valid[invertedDefault] && !config.disabled[invertedDefault]) {
      return invertedDefault;
    }
  }

  return undefined;
}
/**
 * If a correct region could not be resolved due to one or more regions
 * disabled in the config, we need to return a fallback region. This may
 * result in the content rect getting inadvertently clipped with the
 * bounds rect or the target rect, but there is nothing else we can do.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {Object} valid Valid regions (`{top, right, bottom, left}`).
 * @returns {string} A region (`top`, `right`, `bottom`, or `left`).
 */


function getFallbackRegion(config) {
  // Prioritize the configured default region.
  var fallback = config.region; // If the default region is not set or is disabled, pick the first enabled
  // region.

  if (typeof fallback !== 'string' || config.disabled[fallback]) {
    fallback = Object.keys(config.disabled).find(function (region) {
      return !config.disabled[region];
    });
  } // ALL OF THE REGIONS ARE DISABLED ಠ_ಠ


  if (typeof fallback !== 'string') {
    fallback = TOP;
  }

  return fallback;
}
/**
 * Get the current region that should be occupied by the content rect.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {Object} valid Valid regions (`{top, right, bottom, left}`).
 * @returns {array} Array containing region and reason.
 */


function getRegion(config, valid) {
  var ideal = getIdealRegion(config, valid); // Return the default region set in the config if it is valid.

  var defaultRegion = getDefaultRegion(config, valid);

  if (typeof defaultRegion === 'string') {
    return [defaultRegion, defaultRegion === ideal ? 'ideal' : 'default'];
  } // Return the default region set in the config if it is valid.


  var invertedDefault = getInvertDefaultRegion(config, valid);

  if (typeof invertedDefault === 'string') {
    return [invertedDefault, invertedDefault === ideal ? 'ideal' : 'inverted'];
  } // Return the region with the most valid space.


  if (typeof ideal === 'string') {
    return [ideal, 'ideal'];
  } // Retun the region from the external calculation if one is returned.


  var external = getExternalRegion(config);

  if (typeof external === 'string') {
    return [external, 'external'];
  }

  var fallback = getFallbackRegion(config);
  return [fallback, 'fallback'];
}
/**
 * Get the updated left position of the content rect with boundary constraints
 * applied.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @param   {Object} rect A content rect object.
 * @returns {Object} A repositioned content rect.
 */


function constrainRect(config, region, rect) {
  var offsetBounds = getOffsetBounds(config, region);
  var left = constrainLeft(config, region, offsetBounds, rect);
  var top = constrainTop(config, region, offsetBounds, rect);
  return new _Rect.default(left, top, rect.width, rect.height);
}
/**
 * Get the distance between the target rect and the content rect along the
 * normal of the region.
 *
 * If the content rect intersects the target rect, the returned value is
 * negative.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @param   {Object} rect A content rect object.
 * @returns {number} Distance between target and content.
 */


function getOffset(config, region, rect) {
  var target = config.target;

  if (region === TOP) {
    return target.top - rect.bottom;
  } else if (region === RIGHT) {
    return rect.left - target.right;
  } else if (region === BOTTOM) {
    return rect.top - target.bottom;
  } // Region is left.


  return target.left - rect.right;
}
/**
 * Get the current linear overlap between the content rect and the target rect.
 *
 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @param   {Object} intersect The intersection rect of the target and content.
 * @returns {number} Overlap between target and content.
 */


function getOverlap(region, intersect) {
  if (region === TOP || region === BOTTOM) {
    return intersect.width;
  } // Region is left or right.


  return intersect.height;
}
/**
 * Get the center position of the liner overlap range between the content rect
 * and the target rect. This value is calculated to use as a style input when
 * rendering an indicator.
 *
 * The value returned is relative to the top or left edge of the content rect.
 * This is for convenience since an indicator will most likely be rendered as
 * a child of the content element.
 *
 *
 *     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
 *     |            content             |
 *     |________________________________|
 *     |                  |      V      |
 *     |<--overlap-center-+----->|      |
 *                        |<-----+----->|-overlap
 *                        |______|______|____
 *                        |      target      |
 *                         ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 * > The overlap center is relative to the left (or top) edge of the content
 * > rect.
 *
 *     |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
 *     |         content         |
 *     |_________________________|
 *     |                         |   V
 *     |<--overlap-center--------+-->|
 *                               |<--+-->|-overlap
 *                                       |__________________
 *                                       |      target      |
 *                                        ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 * > If there is no geometric overlap between the content rect and the target
 * > rect, the overlap center will be longer then the content rect edge or
 * > will be negative.
 *

 * @param   {string} region A region (`top`, `right`, `bottom`, or `left`).
 * @param   {Object} rect A content rect object.
 * @param   {Object} intersect The intersection rect of the target and content.
 * @returns {number} Distance to overlap center.
 */


function getCenter(region, rect, intersect) {
  if (region === TOP || region === BOTTOM) {
    return intersect.left + intersect.width / 2 - rect.left;
  } // Region is left or right;


  return intersect.top + intersect.height / 2 - rect.top;
}

var allRegions = {
  top: true,
  right: true,
  bottom: true,
  left: true
};
var noRegions = {
  top: false,
  right: false,
  bottom: false,
  left: false
};

function normalizeAlign(align) {
  if (typeof align === 'number') {
    return align;
  }

  if (align === 'start') {
    return 0;
  }

  if (align === 'end') {
    return 1;
  }

  return 0.5;
}

function defaults(config) {
  var _config$offset = config.offset,
      offset = _config$offset === void 0 ? 0 : _config$offset,
      _config$overlap = config.overlap,
      overlap = _config$overlap === void 0 ? 0 : _config$overlap,
      _config$edgeOffset = config.edgeOffset,
      edgeOffset = _config$edgeOffset === void 0 ? 0 : _config$edgeOffset,
      align = config.align,
      region = config.region,
      bounds = config.bounds,
      target = config.target,
      content = config.content,
      disabled = config.disabled,
      constrain = config.constrain;
  return {
    offset: offset,
    overlap: overlap,
    edgeOffset: edgeOffset,
    align: normalizeAlign(align),
    region: region,
    bounds: _Rect.default.from(bounds),
    target: _Rect.default.from(target),
    content: content,
    disabled: _objectSpread({}, noRegions, disabled),
    constrain: _objectSpread({}, allRegions, constrain)
  };
}
/**
 * Calculate a FlowTip layout result.
 *
 * @param   {Object} config FlowTip layout config object.
 * @param   {Object} config.target A rect representing the target element.
 * @param   {Object} config.content A rect representing the content element.
 * @param   {string} [config.region] The default region
 *                                   (`top`, `right`, `bottom`, or `left`).
 * @param   {string} config.disabled Disabled regions
 *                                   (`{top, right, bottom, left}`).
 * @param   {string} config.constrain Constrained regions
 *                                    (`{top, right, bottom, left}`).
 * @param   {number} [config.offset=0] Target-content offset.
 * @param   {number} [config.overlap=0] Min target-content liner overlap.
 * @param   {number} [config.align=0.5] Target-content align factor.
 * @returns {Object} FlowTip layout result object.
 */


function flowtip(config) {
  var finalConfig = defaults(config);
  var valid = getValidRegions(finalConfig);

  var _getRegion = getRegion(finalConfig, valid),
      _getRegion2 = _slicedToArray(_getRegion, 2),
      region = _getRegion2[0],
      reason = _getRegion2[1];

  var tempRect = getRect(finalConfig, region);
  var rect = constrainRect(finalConfig, region, tempRect);

  var intersect = _Rect.default.intersect(finalConfig.target, rect);

  var offset = getOffset(finalConfig, region, rect);
  var overlap = getOverlap(region, intersect);
  var overlapCenter = getCenter(region, rect, intersect);
  return {
    bounds: finalConfig.bounds,
    target: finalConfig.target,
    region: region,
    reason: reason,
    rect: rect,
    valid: valid,
    offset: offset,
    overlap: overlap,
    overlapCenter: overlapCenter
  };
}

var _default = flowtip;
exports.default = _default;
//# sourceMappingURL=flowtip.js.map
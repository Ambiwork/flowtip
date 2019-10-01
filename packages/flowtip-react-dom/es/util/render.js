import { Rect, getClampedTailPosition, RIGHT, LEFT } from 'flowtip-core';
import { getOffset } from "../util/state";
import { getViewportRect } from "../util/dom";
/**
 * Get the content element position style based on the current layout result
 * in the state.
 *
 * @param   {Object} props - FlowTip props.
 * @param   {Object} state - FlowTip props.
 * @returns {Object} Content position style.
 */

export var getContentStyle = function getContentStyle(props, state) {
  // Hide the result with css clip - preserving its ability to be measured -
  // when working with a static layout result mock.
  if (state.result._static === true) {
    return {
      position: 'absolute',
      clip: 'rect(0 0 0 0)'
    };
  }

  if (Rect.areEqual(state.result.bounds, getViewportRect()) && !Rect.isValid(Rect.intersect(state.result.bounds, state.result.target))) {
    if (props.constrainTop && state.result.region === 'bottom') {
      return {
        position: 'fixed',
        top: Math.round(state.result.rect.top),
        left: Math.round(state.result.rect.left)
      };
    }

    if (props.constrainRight && state.result.region === 'left') {
      return {
        position: 'fixed',
        top: Math.round(state.result.rect.top),
        right: Math.round(window.innerWidth - state.result.rect.right)
      };
    }

    if (props.constrainBottom && state.result.region === 'top') {
      return {
        position: 'fixed',
        bottom: Math.round(window.innerHeight - state.result.rect.bottom),
        left: Math.round(state.result.rect.left)
      };
    }

    if (props.constrainLeft && state.result.region === 'right') {
      return {
        position: 'fixed',
        top: Math.round(state.result.rect.top),
        left: Math.round(state.result.rect.left)
      };
    }
  }

  return {
    position: 'absolute',
    top: Math.round(state.result.rect.top - state.containingBlock.top),
    left: Math.round(state.result.rect.left - state.containingBlock.left)
  };
};
/**
 * Get the tail element position style based on the current layout result in
 * the state.
 *
 * @param   {Object} props - FlowTip props.
 * @param   {Object} state - FlowTip props.
 * @returns {Object} Tail position style.
 */

export var getTailStyle = function getTailStyle(props, state) {
  if (!state.result) return {
    position: 'absolute'
  };
  var tailAttached = state.result.offset >= getOffset(props, state);
  var style = {
    position: 'absolute',
    visibility: tailAttached ? 'visible' : 'hidden'
  };

  if (state.tail && state.contentBorders) {
    var borders = state.contentBorders;
    var position = getClampedTailPosition(state.result, state.tail, props.tailOffset); // Position the tail at the opposite edge of the region. i.e. if region is
    // `right` the style will be `right: 100%`, which will place the tail
    // at left edge.

    style[state.result.region] = "calc(100% + ".concat(borders[state.result.region], "px)");

    if (state.result.region === RIGHT || state.result.region === LEFT) {
      style.top = position - borders.top;
    } else {
      style.left = position - borders.left;
    }
  }

  return style;
};
//# sourceMappingURL=render.js.map
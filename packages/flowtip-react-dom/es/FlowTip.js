function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import * as React from 'react';
import flowtip, { CENTER, Rect, areEqualDimensions } from 'flowtip-core';
import findDOMNode from "./util/findDOMNode";
import { getBorders, getContainingBlock, getClippingBlock, getContentRect, getViewportRect } from "./util/dom";
import { getRegion, getOverlap, getOffset } from "./util/state";
import defaultRender from "./defaultRender"; // Static `flowtip` layout calculation result mock for use during initial client
// side render or on server render where DOM feedback is not possible.

var STATIC_RESULT = {
  bounds: Rect.zero,
  target: Rect.zero,
  region: 'bottom',
  reason: 'default',
  rect: Rect.zero,
  valid: {
    top: false,
    right: false,
    bottom: true,
    left: false
  },
  offset: 0,
  overlap: 0,
  overlapCenter: 0,
  _static: true
};

var FlowTip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FlowTip, _React$Component);

  function FlowTip() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, FlowTip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = FlowTip.__proto__ || Object.getPrototypeOf(FlowTip)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "_nextContent", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(_assertThisInitialized(_this), "_nextTail", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(_assertThisInitialized(_this), "_nextContainingBlock", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: Rect.zero
    }), Object.defineProperty(_assertThisInitialized(_this), "_nextBounds", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(_assertThisInitialized(_this), "_lastRegion", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    }), Object.defineProperty(_assertThisInitialized(_this), "_isMounted", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: false
    }), Object.defineProperty(_assertThisInitialized(_this), "_containingBlockNode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(_assertThisInitialized(_this), "_clippingBlockNode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(_assertThisInitialized(_this), "_node", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: null
    }), Object.defineProperty(_assertThisInitialized(_this), "state", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        containingBlock: Rect.zero,
        boundedByViewport: true,
        bounds: null,
        content: null,
        contentBorders: null,
        tail: null,
        result: STATIC_RESULT
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "_handleContentSize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(rect) {
        _this._nextContent = {
          width: rect.width,
          height: rect.height
        };

        _this._updateState(_this.props);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "_handleTailSize", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(rect) {
        _this._nextTail = {
          width: rect.width,
          height: rect.height
        };

        _this._updateState(_this.props);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "_handleScroll", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this._nextContainingBlock = _this._getContainingBlockRect();
        _this._nextBounds = _this._getBoundsRect(_this.props);

        _this._updateState(_this.props);
      }
    }), _temp));
  }

  _createClass(FlowTip, [{
    key: "componentDidMount",
    // Lifecycle Methods =========================================================
    value: function componentDidMount() {
      this._isMounted = true;

      this._updateDOMNodes();

      this._nextContainingBlock = this._getContainingBlockRect();
      this._nextBounds = this._getBoundsRect(this.props);

      this._updateState(this.props);

      window.addEventListener('scroll', this._handleScroll);
      window.addEventListener('resize', this._handleScroll);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this._nextContainingBlock = this._getContainingBlockRect();
      this._nextBounds = this._getBoundsRect(nextProps);

      this._updateState(nextProps);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._updateDOMNodes();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      this._containingBlockNode = null;
      this._clippingBlockNode = null;
      this._node = null;
      window.removeEventListener('scroll', this._handleScroll);
      window.removeEventListener('resize', this._handleScroll);
    } // State Management ==========================================================

    /**
     * Get the next state.
     *
     * This method uses any cached measurements in combination with the provided
     * props to get a new `flowtip` layout result. The element measurements used
     * as inputs to `flowtip` are also cached in the state to compare against the
     * next requested state update.
     *
     * Note: `props` are passed in as an argument to allow using this method from
     * within `componentWillReceiveProps`.
     *
     * @param   {Object} nextProps - FlowTip props.
     * @returns {void}
     */

  }, {
    key: "_getState",
    value: function _getState(nextProps) {
      var containingBlock = this._nextContainingBlock;
      var bounds = this._nextBounds;
      var content = this._nextContent;
      var tail = this._nextTail;
      var target = nextProps.target;
      var result = STATIC_RESULT;

      if (bounds && target && content && (typeof nextProps.Tail !== 'function' || tail)) {
        var intermediateState = _objectSpread({}, this.state, {
          bounds: bounds,
          containingBlock: containingBlock,
          tail: tail,
          content: content
        });

        var offset = getOffset(nextProps, intermediateState);
        var overlap = getOverlap(nextProps, intermediateState);
        var region = getRegion(nextProps, intermediateState);
        var _nextProps$edgeOffset = nextProps.edgeOffset,
            edgeOffset = _nextProps$edgeOffset === void 0 ? offset : _nextProps$edgeOffset,
            align = nextProps.align;
        var config = {
          offset: offset,
          edgeOffset: edgeOffset,
          overlap: overlap,
          align: align,
          region: region,
          bounds: bounds,
          target: target,
          content: content,
          disabled: {
            top: nextProps.topDisabled,
            right: nextProps.rightDisabled,
            bottom: nextProps.bottomDisabled,
            left: nextProps.leftDisabled
          },
          constrain: {
            top: nextProps.constrainTop,
            right: nextProps.constrainRight,
            bottom: nextProps.constrainBottom,
            left: nextProps.constrainLeft
          }
        };
        result = flowtip(config);
      }

      var contentBorders = this._node ? getBorders(this._node) : null;
      var boundedByViewport = !nextProps.bounds && this._clippingBlockNode === document.documentElement;
      return {
        containingBlock: containingBlock,
        boundedByViewport: boundedByViewport,
        bounds: bounds,
        content: content,
        contentBorders: contentBorders,
        tail: tail,
        result: result
      };
    }
    /**
     * Trigger a state update and render if necessary.
     *
     * Note: `props` are passed in as an argument to allow using this method from
     * within `componentWillReceiveProps`.
     *
     * @param   {Object} nextProps - FlowTip props.
     * @returns {void}
     */

  }, {
    key: "_updateState",
    value: function _updateState(nextProps) {
      if (!this._isMounted) return; // Only trigger a state update if the dynamic measurements have changed
      // since the last update. We can optimize here since the `flowtip` layout
      // calculation is an entire pure function - we would get the same result.

      if (!areEqualDimensions(this.state.content, this._nextContent) || !areEqualDimensions(this.state.tail, this._nextTail) || !Rect.areEqual(this.state.containingBlock, this._nextContainingBlock) || !Rect.areEqual(this.state.bounds, this._nextBounds) || !Rect.areEqual(this.props.target, nextProps.target) || this.props.region !== nextProps.region || this.props.sticky !== nextProps.sticky || this.props.targetOffset !== nextProps.targetOffset || this.props.edgeOffset !== nextProps.edgeOffset || this.props.tailOffset !== nextProps.tailOffset || this.props.align !== nextProps.align || this.props.topDisabled !== nextProps.topDisabled || this.props.rightDisabled !== nextProps.rightDisabled || this.props.bottomDisabled !== nextProps.bottomDisabled || this.props.leftDisabled !== nextProps.leftDisabled || this.props.constrainTop !== nextProps.constrainTop || this.props.constrainRight !== nextProps.constrainRight || this.props.constrainBottom !== nextProps.constrainBottom || this.props.constrainLeft !== nextProps.constrainLeft) {
        this.setState(this._getState(nextProps));
      }
    } // DOM Measurement Methods ===================================================

  }, {
    key: "_getBoundsRect",
    value: function _getBoundsRect(nextProps) {
      var processBounds = function processBounds(boundsRect) {
        var visibleBounds = Rect.intersect(getViewportRect(), boundsRect);
        return Rect.isValid(visibleBounds) ? visibleBounds : null;
      };

      if (nextProps.bounds) {
        return processBounds(nextProps.bounds);
      }

      if (document.body && this._clippingBlockNode === document.documentElement) {
        return processBounds(new Rect(-document.body.scrollLeft, -document.body.scrollTop, document.body.scrollWidth, document.body.scrollHeight));
      }

      if (this._clippingBlockNode) {
        return processBounds(getContentRect(this._clippingBlockNode));
      }

      return null;
    }
  }, {
    key: "_getContainingBlockRect",
    value: function _getContainingBlockRect() {
      if (!this._containingBlockNode) {
        return Rect.zero;
      }

      if (document.body && this._containingBlockNode === document.documentElement) {
        return new Rect(-document.body.scrollLeft, -document.body.scrollTop, document.body.scrollWidth, document.body.scrollHeight);
      }

      return getContentRect(this._containingBlockNode);
    } // DOM Element Accessors =====================================================

  }, {
    key: "_updateDOMNodes",
    value: function _updateDOMNodes() {
      var node = findDOMNode(this);

      if (node instanceof HTMLElement) {
        this._node = node;
        this._containingBlockNode = getContainingBlock(node.parentNode);
        this._clippingBlockNode = getClippingBlock(node.parentNode);
      }
    } // Event Handlers ============================================================

    /**
     * Content `ResizeObserver` handler.
     *
     * Responds to changes in the dimensions of the rendered content and updates
     * the cached `_nextContent` rect and triggers a state update.
     *
     * @param   {Object} rect - Object with `width` and `height` properties.
     * @returns {void}
     */

  }, {
    key: "render",
    value: function render() {
      return this.props.render({
        onTailSize: this._handleTailSize,
        onContentSize: this._handleContentSize,
        state: this.state,
        props: this.props
      });
    }
  }]);

  return FlowTip;
}(React.Component);

Object.defineProperty(FlowTip, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    bounds: null,
    region: undefined,
    sticky: true,
    targetOffset: 0,
    edgeOffset: 0,
    tailOffset: 0,
    align: CENTER,
    topDisabled: false,
    rightDisabled: false,
    bottomDisabled: false,
    leftDisabled: false,
    constrainTop: true,
    constrainRight: true,
    constrainBottom: true,
    constrainLeft: true,
    render: defaultRender
  }
});
export default FlowTip;
//# sourceMappingURL=FlowTip.js.map
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rect =
/*#__PURE__*/
function () {
  _createClass(Rect, null, [{
    key: "from",

    /**
     * Convert a rect-like object to a Rect instance. This is useful for
     * converting non-serializable ClientRect instances to more standard objects.
     *
     * @param   {Object} rect A rect-like object.
     * @returns {Object} A Rect instance.
     */
    value: function from(rect) {
      if (rect instanceof Rect) return rect;
      return new Rect(rect.left, rect.top, rect.width, rect.height);
    }
    /**
     * Calculate the intersection of two rects.
     *
     * If there is a true geometric intersection, the returned rect will have a
     * positive width and height.
     *
     * If the rects do not intersect in either axis, the returned dimension for
     * that axis is negative and represents the distance between the rects.
     *
     * @param   {Object} a A rect-like object.
     * @param   {Object} b A rect-like object.
     * @returns {Object} A Rect instance.
     */

  }, {
    key: "intersect",
    value: function intersect(a, b) {
      var rectA = Rect.from(a);
      var rectB = Rect.from(b);
      var left = Math.max(rectA.left, rectB.left);
      var right = Math.min(rectA.right, rectB.right);
      var top = Math.max(rectA.top, rectB.top);
      var bottom = Math.min(rectA.bottom, rectB.bottom);
      var width = right - left;
      var height = bottom - top;
      return new Rect(left, top, width, height);
    }
    /**
     * Expand (or shrink) the boundaries of a rect.
     *
     * @param   {Object} rect A rect-like object.
     * @param   {number} amount Offset to apply to each boundary edge.
     * @returns {Object} A Rect instance.
     */

  }, {
    key: "grow",
    value: function grow(rect, amount) {
      return new Rect(rect.left - amount, rect.top - amount, rect.width + amount * 2, rect.height + amount * 2);
    }
    /**
     * Determine if two rect-like objects are equal.
     *
     * @param   {Object} [a] A rect-like object.
     * @param   {Object} [b] A rect-like object.
     * @returns {boolean} True if rects are equal.
     */

  }, {
    key: "areEqual",
    value: function areEqual(a, b) {
      if (a === b) return true;

      if ((a === null || a === undefined) && (b === null || b === undefined)) {
        return true;
      }

      if (a === null || a === undefined || b === null || b === undefined) {
        return false;
      }

      return a.left === b.left && a.top === b.top && a.width === b.width && a.height === b.height;
    }
    /**
     * Determine if a rect-like object has valid positive area.
     *
     * @param   {Object} [rect] A rect-like object.
     * @returns {boolean} True if the rect has a positive area.
     */

  }, {
    key: "isValid",
    value: function isValid(rect) {
      return rect.width >= 0 && rect.height >= 0;
    }
  }]);

  function Rect(left, top, width, height) {
    _classCallCheck(this, Rect);

    Object.defineProperty(this, "top", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "left", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "height", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "width", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "right", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "bottom", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
    Object.freeze(this);
  }

  return Rect;
}();

Object.defineProperty(Rect, "zero", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: new Rect(0, 0, 0, 0)
});
export default Rect;
//# sourceMappingURL=Rect.js.map
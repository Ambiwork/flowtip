"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _flowtip.default;
  }
});
Object.defineProperty(exports, "TOP", {
  enumerable: true,
  get: function get() {
    return _flowtip.TOP;
  }
});
Object.defineProperty(exports, "RIGHT", {
  enumerable: true,
  get: function get() {
    return _flowtip.RIGHT;
  }
});
Object.defineProperty(exports, "BOTTOM", {
  enumerable: true,
  get: function get() {
    return _flowtip.BOTTOM;
  }
});
Object.defineProperty(exports, "LEFT", {
  enumerable: true,
  get: function get() {
    return _flowtip.LEFT;
  }
});
Object.defineProperty(exports, "CENTER", {
  enumerable: true,
  get: function get() {
    return _flowtip.CENTER;
  }
});
Object.defineProperty(exports, "areEqualDimensions", {
  enumerable: true,
  get: function get() {
    return _areEqualDimensions.default;
  }
});
Object.defineProperty(exports, "getClampedTailPosition", {
  enumerable: true,
  get: function get() {
    return _getClampedTailPosition.default;
  }
});
Object.defineProperty(exports, "Rect", {
  enumerable: true,
  get: function get() {
    return _Rect.default;
  }
});

var _flowtip = _interopRequireWildcard(require("./flowtip"));

var _areEqualDimensions = _interopRequireDefault(require("./util/areEqualDimensions"));

var _getClampedTailPosition = _interopRequireDefault(require("./util/getClampedTailPosition"));

var _Rect = _interopRequireDefault(require("./Rect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
//# sourceMappingURL=index.js.map
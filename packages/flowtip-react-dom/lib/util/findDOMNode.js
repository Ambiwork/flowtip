"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = require("react-dom");

var findDOMNode = function findDOMNode(componentOrElement) {
  var node = (0, _reactDom.findDOMNode)(componentOrElement);
  if (node) return node;
  var fiberNode = // flowlint-next-line unclear-type: off
  componentOrElement && componentOrElement._reactInternalFiber;

  while (fiberNode && !(fiberNode.stateNode instanceof Element)) {
    fiberNode = fiberNode.child;
  }

  return fiberNode ? fiberNode.stateNode : null;
};

var _default = findDOMNode;
exports.default = _default;
//# sourceMappingURL=findDOMNode.js.map
import { findDOMNode as _findDOMNode } from 'react-dom';

var findDOMNode = function findDOMNode(componentOrElement) {
  var node = _findDOMNode(componentOrElement);

  if (node) return node;
  var fiberNode = // flowlint-next-line unclear-type: off
  componentOrElement && componentOrElement._reactInternalFiber;

  while (fiberNode && !(fiberNode.stateNode instanceof Element)) {
    fiberNode = fiberNode.child;
  }

  return fiberNode ? fiberNode.stateNode : null;
};

export default findDOMNode;
//# sourceMappingURL=findDOMNode.js.map
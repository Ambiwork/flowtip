"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactResizeObserver = _interopRequireDefault(require("react-resize-observer"));

var _render2 = require("./util/render");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

var omitFlowtipProps = function omitFlowtipProps(props) {
  var _target = props.target,
      _bounds = props.bounds,
      _region = props.region,
      _sticky = props.sticky,
      _targetOffset = props.targetOffset,
      _edgeOffset = props.edgeOffset,
      _tailOffset = props.tailOffset,
      _align = props.align,
      _topDisabled = props.topDisabled,
      _rightDisabled = props.rightDisabled,
      _bottomDisabled = props.bottomDisabled,
      _leftDisabled = props.leftDisabled,
      _constrainTop = props.constrainTop,
      _constrainRight = props.constrainRight,
      _constrainBottom = props.constrainBottom,
      _constrainLeft = props.constrainLeft,
      _render = props.render,
      _content = props.content,
      _tail = props.tail,
      rest = _objectWithoutProperties(props, ["target", "bounds", "region", "sticky", "targetOffset", "edgeOffset", "tailOffset", "align", "topDisabled", "rightDisabled", "bottomDisabled", "leftDisabled", "constrainTop", "constrainRight", "constrainBottom", "constrainLeft", "render", "content", "tail"]);

  return rest;
};

var isComponent = function isComponent(component) {
  return typeof component === 'string' || typeof component === 'function';
};

var defaultRender = function defaultRender(renderProps) {
  var props = renderProps.props,
      state = renderProps.state,
      onTailSize = renderProps.onTailSize,
      onContentSize = renderProps.onContentSize;
  var _props$content = props.content,
      ContentComponent = _props$content === void 0 ? 'div' : _props$content,
      TailComponent = props.tail;
  return React.createElement(ContentComponent, _extends({}, omitFlowtipProps(props), {
    style: (0, _render2.getContentStyle)(props, state)
  }, typeof ContentComponent === 'string' ? null : {
    result: state.result
  }), React.createElement(_reactResizeObserver.default, {
    onResize: onContentSize
  }), props.children, isComponent(TailComponent) && React.createElement(TailComponent, {
    style: (0, _render2.getTailStyle)(props, state),
    result: state.result
  }, React.createElement(_reactResizeObserver.default, {
    onResize: onTailSize
  })));
};

var _default = defaultRender;
exports.default = _default;
//# sourceMappingURL=defaultRender.js.map
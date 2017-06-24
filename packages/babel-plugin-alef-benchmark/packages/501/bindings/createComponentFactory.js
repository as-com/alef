'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createComponentFactory;

var _alefUtils = require('alef-utils');

var _combineRules = require('../combineRules');

var _combineRules2 = _interopRequireDefault(_combineRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function createComponentFactory(createElement, contextTypes) {
  return function createComponent(rule) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var passThroughProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var displayName = rule.name ? rule.name : 'AlefComponent';

    var AlefComponent = function AlefComponent(_ref, _ref2) {
      var renderer = _ref2.renderer,
          theme = _ref2.theme;

      var children = _ref.children,
          _alefRule = _ref._alefRule,
          _ref$passThrough = _ref.passThrough,
          passThrough = _ref$passThrough === undefined ? [] : _ref$passThrough,
          ruleProps = _objectWithoutProperties(_ref, ['children', '_alefRule', 'passThrough']);

      if (!renderer) {
        throw new Error("createComponent() can't render styles without the renderer in the context. Missing react-alef's <Provider /> at the app root?");
      }

      var combinedRule = _alefRule ? (0, _combineRules2.default)(rule, _alefRule) : rule;

      // improve developer experience with monolithic renderer
      if (renderer.prettySelectors) {
        var componentName = typeof type === 'string' ? type : type.displayName || type.name || '';

        combinedRule.selectorPrefix = displayName + '_' + componentName + '__';
      }

      // compose passThrough props from arrays or functions
      var resolvedPassThrough = [].concat(_toConsumableArray((0, _alefUtils.resolvePassThrough)(passThroughProps, ruleProps)), _toConsumableArray((0, _alefUtils.resolvePassThrough)(passThrough, ruleProps)));

      // if the component renders into another Alef component
      // we pass down the combinedRule as well as both
      if (type._isAlefComponent) {
        return createElement(type, _extends({
          _alefRule: combinedRule,
          passThrough: resolvedPassThrough
        }, ruleProps), children);
      }

      var componentProps = (0, _alefUtils.extractPassThroughProps)(resolvedPassThrough, ruleProps);

      ruleProps.theme = theme || {};

      // alef-native support
      if (renderer.isNativeRenderer) {
        var alefStyle = renderer.renderRule(combinedRule, ruleProps);
        componentProps.style = ruleProps.style ? [ruleProps.style, alefStyle] : alefStyle;
      } else {
        if (ruleProps.style) {
          componentProps.style = ruleProps.style;
        }
        var cls = ruleProps.className ? ruleProps.className + ' ' : '';
        componentProps.className = cls + renderer.renderRule(combinedRule, ruleProps);
      }

      if (ruleProps.id) {
        componentProps.id = ruleProps.id;
      }

      if (ruleProps.innerRef) {
        componentProps.ref = ruleProps.innerRef;
      }

      var customType = ruleProps.is || type;
      return createElement(customType, componentProps, children);
    };

    if (contextTypes) {
      AlefComponent.contextTypes = contextTypes;
    }

    // use the rule name as display name to better debug with react inspector
    AlefComponent.displayName = displayName;
    AlefComponent._isAlefComponent = true;

    return AlefComponent;
  };
}
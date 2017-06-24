'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateDisplayName;
function generateDisplayName(component) {
  var displayName = component.displayName || component.name;

  if (displayName) {
    return 'Alef' + displayName;
  }

  return 'ConnectedAlefComponent';
}
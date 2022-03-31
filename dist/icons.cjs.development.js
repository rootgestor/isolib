'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var icons = require('@ant-design/icons');
var React = _interopDefault(require('react'));

function Custom(_ref) {
  var src = _ref.src;
  return React.createElement("img", {
    style: {
      width: '25px',
      height: '25px',
      padding: '5px'
    },
    src: src
  });
}

Object.keys(icons).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return icons[k];
    }
  });
});
exports.CustomIcon = Custom;
//# sourceMappingURL=icons.cjs.development.js.map

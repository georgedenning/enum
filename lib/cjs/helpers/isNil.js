"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isUndefined = _interopRequireDefault(require("./isUndefined.js"));

var _isNull = _interopRequireDefault(require("./isNull.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(value) {
  return (0, _isUndefined["default"])(value) || (0, _isNull["default"])(value);
};

exports["default"] = _default;
//# sourceMappingURL=isNil.js.map
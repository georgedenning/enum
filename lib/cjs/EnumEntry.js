"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isObject = _interopRequireDefault(require("./helpers/isObject.js"));

var _isNil = _interopRequireDefault(require("./helpers/isNil.js"));

var _isString = _interopRequireDefault(require("./helpers/isString.js"));

var _isNumber = _interopRequireDefault(require("./helpers/isNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EnumEntry = /*#__PURE__*/function () {
  /**
   * @param {String} key
   * @param {Number} value
   * @param {Object|String} options
   */
  function EnumEntry(key, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, EnumEntry);

    if ((0, _isNil["default"])(key) || !(0, _isString["default"])(key)) {
      throw new TypeError('key must be of type "string"');
    }

    if ((0, _isNil["default"])(value) || !(0, _isNumber["default"])(value)) {
      throw new TypeError('value must be of type "number"');
    }

    if ((0, _isNil["default"])(options) || !(0, _isObject["default"])(options)) {
      throw new TypeError('options must be of type "object"');
    }

    this.key = key;
    this.value = value;

    this._setOptions(options);
  }
  /**
   * @param {Object|String} options
   */


  _createClass(EnumEntry, [{
    key: "_setOptions",
    value: function _setOptions(options) {
      this._options = options || {};
      this._options.ignoreCase = this._options.ignoreCase || EnumEntry._defaultOptions.ignoreCase;
    }
    /**
     * @param {EnumEntry|String|Number}
     */

  }, {
    key: "has",
    value: function has(value) {
      if (EnumEntry.isEnumEntry(value)) {
        return this.value === value.value;
      }

      if ((0, _isString["default"])(value)) {
        if (this._options.ignoreCase) {
          return this.key.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        }

        return this.key.indexOf(value) >= 0;
      }

      return this.value === value;
    }
    /**
     * @param {EnumEntry|String|Number}
     */

  }, {
    key: "is",
    value: function is(key) {
      if (EnumEntry.isEnumEntry(key)) {
        return this.key === key.key;
      }

      if ((0, _isString["default"])(key)) {
        if (this._options.ignoreCase) {
          return this.key.toLowerCase() === key.toLowerCase();
        }

        return this.key === key;
      }

      return this.value === key;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.key;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this.key);
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
  }], [{
    key: "isEnumEntry",
    value:
    /**
     * @param {EnumEntry|Object} entry
     */
    function isEnumEntry(entry) {
      if (entry instanceof EnumEntry) {
        return true;
      }

      if ((0, _isObject["default"])(entry) && !(0, _isNil["default"])(entry.key) && !(0, _isNil["default"])(entry.value)) {
        return true;
      }

      return false;
    }
  }]);

  return EnumEntry;
}();

exports["default"] = EnumEntry;

_defineProperty(EnumEntry, "_defaultOptions", {
  ignoreCase: false
});
//# sourceMappingURL=EnumEntry.js.map
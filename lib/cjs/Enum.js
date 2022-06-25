"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Enum = void 0;

var _isString = _interopRequireDefault(require("./helpers/isString.js"));

var _isObject = _interopRequireDefault(require("./helpers/isObject.js"));

var _isArray = _interopRequireDefault(require("./helpers/isArray.js"));

var _isNil = _interopRequireDefault(require("./helpers/isNil.js"));

var _EnumEntry = _interopRequireDefault(require("./EnumEntry.js"));

var _Symbol$iterator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$iterator = Symbol.iterator;

var Enum = /*#__PURE__*/function () {
  /**
   * @param {Array|Object} entries
   * @param {Object|String} options
   */
  function Enum(entries) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Enum);

    if ((0, _isNil["default"])(entries) || !(0, _isObject["default"])(entries) && !(0, _isArray["default"])(entries)) {
      throw new TypeError('entries must be of type "object" or "array"');
    }

    if ((0, _isNil["default"])(options) || !(0, _isObject["default"])(options) && !(0, _isString["default"])(options)) {
      throw new TypeError('options must be of type "object"');
    }

    this._setOptions(options);

    this._setEntries(entries);
  }
  /**
   * @param {Object|String} options
   */


  _createClass(Enum, [{
    key: "_setOptions",
    value: function _setOptions(options) {
      if ((0, _isString["default"])(options)) {
        options = {
          name: options
        };
      }

      this._options = options || {};
      this._options.ignoreCase = this._options.ignoreCase || Enum._defaultOptions.ignoreCase;

      if (this._options.name) {
        this.name = this._options.name;
      }
    }
    /**
     * @param {Array|Object} entries
     */

  }, {
    key: "_setEntries",
    value: function _setEntries(entries) {
      this.enums = [];

      if ((0, _isArray["default"])(entries)) {
        var entriesArray = entries;
        entries = entriesArray.reduce(function (result, entry, index) {
          result[entry] = index;
          return result;
        }, {});
      }

      this._entries = entries;

      for (var entry in this._entries) {
        this[entry] = new _EnumEntry["default"](entry, this._entries[entry], {
          ignoreCase: this._options.ignoreCase
        });
        this.enums.push(this[entry]);
      }
    }
    /**
     * @param {EnumEntry|String|Number} entries
     */

  }, {
    key: "get",
    value: function get(key) {
      if ((0, _isNil["default"])(key)) {
        return;
      }

      if (_EnumEntry["default"].isEnumEntry(key)) {
        if (key.key in this) {
          return key;
        } else {
          throw new ReferenceError("\"".concat(key.key, "\" is not a valid enum entry key"));
        }
      }

      if ((0, _isString["default"])(key)) {
        var enums = this.enums;

        if (this._options.ignoreCase) {
          enums = this.getLowerCaseEnums();
          key = key.toLowerCase();
        }

        if (!(key in this)) {
          throw new ReferenceError("\"".concat(key, "\" is not a valid enum entry key"));
        }

        return enums.find(function (entry) {
          return entry.key === key;
        });
      }

      if (!this.enums.map(function (entry) {
        return entry.value;
      }).includes(key)) {
        throw new ReferenceError("\"".concat(key, "\" is not a valid enum entry value"));
      }

      return this.enums.find(function (entry) {
        return entry.value === key;
      });
    }
    /**
     * @param {EnumEntry|String|Number} value
     */

  }, {
    key: "getKey",
    value: function getKey(value) {
      var entry = this.get(value);

      if (!entry) {
        throw new ReferenceError("entry not found");
      }

      return entry.key;
    }
    /**
     * @param {EnumEntry|String|Number} value
     */

  }, {
    key: "getValue",
    value: function getValue(value) {
      var entry = this.get(value);

      if (!entry) {
        throw new ReferenceError("entry not found");
      }

      return entry.value;
    }
  }, {
    key: "getLowerCaseEnums",
    value: function getLowerCaseEnums() {
      return this.enums.map(function (entry) {
        return _objectSpread(_objectSpread({}, entry), {}, {
          key: entry.key.toLowerCase()
        });
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this._entries);
    }
  }, {
    key: _Symbol$iterator,
    value: function value() {
      var _this = this;

      var index = 0;
      return {
        next: function next() {
          if (index < _this.enums.length) {
            return {
              value: _this.enums[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        }
      };
    }
  }], [{
    key: "register",
    value:
    /**
     * @param {String} key
     */
    function register() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Enum';

      if (typeof global !== 'undefined' && !global[key]) {
        global[key] = Enum;
      } else if (typeof window !== 'undefined' && !window[key]) {
        window[key] = Enum;
      }
    }
  }]);

  return Enum;
}();

exports.Enum = Enum;

_defineProperty(Enum, "_defaultOptions", {
  ignoreCase: false
});

var _default = Enum;
exports["default"] = _default;
//# sourceMappingURL=Enum.js.map
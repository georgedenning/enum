(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@gden/enum"] = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var isType = (function (type, value) {
    return _typeof(value) === type;
  });

  var isString = (function (value) {
    return isType('string', value);
  });

  var isArray = (function (value) {
    return Array.isArray(value);
  });

  var isNull = (function (value) {
    return value === null;
  });

  var isObject = (function (value) {
    return isType('object', value) && !isArray(value) && !isNull(value);
  });

  var isUndefined = (function (value) {
    return value === undefined;
  });

  var isNil = (function (value) {
    return isUndefined(value) || isNull(value);
  });

  var isNumber = (function (value) {
    return isType('number', value);
  });

  var EnumEntry = /*#__PURE__*/function () {
    /**
     * @param {String} key
     * @param {Number} value
     * @param {Object|String} options
     */
    function EnumEntry(key, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, EnumEntry);

      if (isNil(key) || !isString(key)) {
        throw new TypeError('key must be of type "string"');
      }

      if (isNil(value) || !isNumber(value)) {
        throw new TypeError('value must be of type "number"');
      }

      if (isNil(options) || !isObject(options)) {
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

        if (isString(value)) {
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

        if (isString(key)) {
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

        if (isObject(entry) && !isNil(entry.key) && !isNil(entry.value)) {
          return true;
        }

        return false;
      }
    }]);

    return EnumEntry;
  }();

  _defineProperty(EnumEntry, "_defaultOptions", {
    ignoreCase: false
  });

  var _Symbol$iterator;
  _Symbol$iterator = Symbol.iterator;

  var Enum = /*#__PURE__*/function () {
    /**
     * @param {Array|Object} entries
     * @param {Object|String} options
     */
    function Enum(entries) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Enum);

      if (isNil(entries) || !isObject(entries) && !isArray(entries)) {
        throw new TypeError('entries must be of type "object" or "array"');
      }

      if (isNil(options) || !isObject(options) && !isString(options)) {
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
        if (isString(options)) {
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

        if (isArray(entries)) {
          var entriesArray = entries;
          entries = entriesArray.reduce(function (result, entry, index) {
            result[entry] = index;
            return result;
          }, {});
        }

        this._entries = entries;

        for (var entry in this._entries) {
          this[entry] = new EnumEntry(entry, this._entries[entry], {
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
        if (isNil(key)) {
          return;
        }

        if (EnumEntry.isEnumEntry(key)) {
          if (key.key in this) {
            return key;
          } else {
            throw new ReferenceError("\"".concat(key.key, "\" is not a valid enum entry key"));
          }
        }

        if (isString(key)) {
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
          return _objectSpread2(_objectSpread2({}, entry), {}, {
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

  _defineProperty(Enum, "_defaultOptions", {
    ignoreCase: false
  });

  return Enum;

}));
//# sourceMappingURL=umd.js.map

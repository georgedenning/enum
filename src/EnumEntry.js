import isObject from './helpers/isObject.js';
import isNil from './helpers/isNil.js';
import isString from './helpers/isString.js';
import isNumber from './helpers/isNumber.js';

export default class EnumEntry {
    static _defaultOptions = {
        ignoreCase: false
    };

    /**
     * @param {EnumEntry|Object} entry
     */
    static isEnumEntry(entry) {
        if (entry instanceof EnumEntry) {
            return true;
        }

        if (isObject(entry) && !isNil(entry.key) && !isNil(entry.value)) {
            return true;
        }

        return false;
    }

    /**
     * @param {String} key
     * @param {Number} value
     * @param {Object|String} options
     */
    constructor(key, value, options = {}) {
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
    _setOptions(options) {
        this._options = options || {};
        this._options.ignoreCase = this._options.ignoreCase || EnumEntry._defaultOptions.ignoreCase;
    }

    /**
     * @param {EnumEntry|String|Number}
     */
    has(value) {
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
    is(key) {
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

    toString() {
        return this.key;
    }

    toJSON() {
        return JSON.stringify(this.key);
    }

    valueOf() {
        return this.value;
    }
}

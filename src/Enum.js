import isString from './helpers/isString.js';
import isObject from './helpers/isObject.js';
import isArray from './helpers/isArray.js';
import isNil from './helpers/isNil.js';

import EnumEntry from './EnumEntry.js';

export default class Enum {
    static _defaultOptions = {
        ignoreCase: false
    };

    /**
     * @param {String} key
     */
    static register(key = 'Enum') {
        if (typeof global !== 'undefined' && !global[key]) {
            global[key] = Enum;
        } else if (typeof window !== 'undefined' && !window[key]) {
            window[key] = Enum;
        }
    }

    /**
     * @param {Array|Object} entries
     * @param {Object|String} options
     */
    constructor(entries, options = {}) {
        if (isNil(entries) || (!isObject(entries) && !isArray(entries))) {
            throw new TypeError('entries must be of type "object" or "array"');
        }

        if (isNil(options) || (!isObject(options) && !isString(options))) {
            throw new TypeError('options must be of type "object"');
        }

        this._setOptions(options);
        this._setEntries(entries);
    }

    /**
     * @param {Object|String} options
     */
    _setOptions(options) {
        if (isString(options)) {
            options = { name: options };
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
    _setEntries(entries) {
        this.enums = [];

        if (isArray(entries)) {
            const entriesArray = entries;

            entries = entriesArray.reduce((result, entry, index) => {
                result[entry] = index;
                return result;
            }, {});
        }

        this._entries = entries;

        for (const entry in this._entries) {
            this[entry] = new EnumEntry(entry, this._entries[entry], { ignoreCase: this._options.ignoreCase });
            this.enums.push(this[entry]);
        }
    }

    /**
     * @param {EnumEntry|String|Number} entries
     */
    get(key) {
        if (isNil(key)) {
            return;
        }

        if (EnumEntry.isEnumEntry(key)) {
            if (key.key in this) {
                return key;
            } else {
                throw new ReferenceError(`"${key.key}" is not a valid enum entry key`);
            }
        }

        if (isString(key)) {
            let enums = this.enums;

            if (this._options.ignoreCase) {
                enums = this.getLowerCaseEnums();
                key = key.toLowerCase();
            }

            if (!(key in this)) {
                throw new ReferenceError(`"${key}" is not a valid enum entry key`);
            }

            return enums.find(entry => entry.key === key);
        }

        if (!this.enums.map(entry => entry.value).includes(key)) {
            throw new ReferenceError(`"${key}" is not a valid enum entry value`);
        }

        return this.enums.find(entry => entry.value === key);
    }

    /**
     * @param {EnumEntry|String|Number} value
     */
    getKey(value) {
        const entry = this.get(value);

        if (!entry) {
            throw new ReferenceError(`entry not found`);
        }

        return entry.key;
    }

    /**
     * @param {EnumEntry|String|Number} value
     */
    getValue(value) {
        const entry = this.get(value);

        if (!entry) {
            throw new ReferenceError(`entry not found`);
        }

        return entry.value;
    }

    getLowerCaseEnums() {
        return this.enums.map(entry => {
            return { ...entry, key: entry.key.toLowerCase() };
        });
    }

    toJSON() {
        return JSON.stringify(this._entries);
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.enums.length) {
                    return { value: this.enums[index++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

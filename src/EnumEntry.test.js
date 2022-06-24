import EnumEntry from './EnumEntry.js';

describe('EnumEntry', () => {
    test('is ok', () => {
        expect(EnumEntry).toBeTruthy();
    });
});

describe('EnumEntry.isEnumEntry', () => {
    test('returns true if the entry value is an EnumEntry', () => {
        expect(EnumEntry.isEnumEntry(new EnumEntry('a', 0))).toStrictEqual(true);
    });
    test('returns true if the entry value has a key and a value', () => {
        expect(EnumEntry.isEnumEntry({ key: 'a', value: 0 })).toStrictEqual(true);
    });
    test('returns false if the entry value is null', () => {
        expect(EnumEntry.isEnumEntry(null)).toStrictEqual(false);
    });
    test('returns false if the entry value is undefined', () => {
        expect(EnumEntry.isEnumEntry(undefined)).toStrictEqual(false);
    });
    test('returns false if the entry value is string', () => {
        expect(EnumEntry.isEnumEntry('a')).toStrictEqual(false);
    });
    test('returns false if the entry value is number', () => {
        expect(EnumEntry.isEnumEntry(123)).toStrictEqual(false);
    });
});

describe('EnumEntry constructor key param', () => {
    test('is a required param', () => {
        expect(() => new EnumEntry(undefined, 0)).toThrow(TypeError);
    });
    test('does not throw a TypeError when key is string', () => {
        expect(() => new EnumEntry('a', 0)).not.toThrow(TypeError);
    });
    test('throws a TypeError when key is null', () => {
        expect(() => new EnumEntry(null, 0)).toThrow(TypeError);
    });
    test('throws a TypeError when key is a number', () => {
        expect(() => new EnumEntry(123, 0)).toThrow(TypeError);
    });
    test('throws a TypeError when key is an array', () => {
        expect(() => new EnumEntry(['a'], 0)).toThrow(TypeError);
    });
    test('accepts a string', () => {
        expect(() => new EnumEntry('a', 0)).not.toThrow(TypeError);
    });
});

describe('EnumEntry constructor value param', () => {
    test('is a required param', () => {
        expect(() => new EnumEntry('a')).toThrow(TypeError);
    });
    test('does not throw a TypeError when value is a number', () => {
        expect(() => new EnumEntry('a', 123)).not.toThrow(TypeError);
    });
    test('throws a TypeError when value is null', () => {
        expect(() => new EnumEntry('a', null)).toThrow(TypeError);
    });
    test('throws a TypeError when value is a string', () => {
        expect(() => new EnumEntry('a', 'b')).toThrow(TypeError);
    });
    test('throws a TypeError when value is an array', () => {
        expect(() => new EnumEntry('a', ['b'])).toThrow(TypeError);
    });
    test('accepts a number', () => {
        expect(() => new EnumEntry('a', 0)).not.toThrow(TypeError);
    });
});

describe('EnumEntry constructor options param', () => {
    test('is not a required param', () => {
        expect(() => new EnumEntry('a', 0)).not.toThrow(TypeError);
    });
    test('does not throw a TypeError when options is undefined', () => {
        expect(() => new EnumEntry('a', 0, undefined)).not.toThrow(TypeError);
    });
    test('throws a TypeError when options is null', () => {
        expect(() => new EnumEntry('a', 0, null)).toThrow(TypeError);
    });
    test('throws a TypeError when options is string', () => {
        expect(() => new EnumEntry('a', 0, 'foo')).toThrow(TypeError);
    });
    test('throws a TypeError when options is a number', () => {
        expect(() => new EnumEntry('a', 0, 123)).toThrow(TypeError);
    });
    test('throws a TypeError when options is an array', () => {
        expect(() => new EnumEntry('a', 0, ['a', 'b', 'c'])).toThrow(TypeError);
    });
    test('accepts an object', () => {
        expect(() => new EnumEntry('a', 0, { a: 0, b: 1, c: 2 })).not.toThrow(TypeError);
    });
});

describe('EnumEntry _setOptions', () => {
    test('defaults are set when options param is falsy', () => {
        const entry = new EnumEntry('a', 0);
        entry._setOptions({});
        expect(entry._options).toStrictEqual(EnumEntry._defaultOptions);
    });

    test('setting the ignoreCase option sets options.ignoreCase', () => {
        const entry = new EnumEntry('a', 0);
        const ignoreCase = true;
        entry._setOptions({ ignoreCase });
        expect(entry._options.ignoreCase).toStrictEqual(ignoreCase);
    });
});

describe('EnumEntry has', () => {
    test('is true when param is an EnumEntry with the same entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.has(entry)).toStrictEqual(true);
    });
    test('is false when param is an EnumEntry without the same entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.has(new EnumEntry('b', 1))).toStrictEqual(false);
    });
    test('is true when param is a string with the same entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.has('a')).toStrictEqual(true);
    });
    test('is true when param is a string within the entry key', () => {
        const entry = new EnumEntry('ab', 0);
        expect(entry.has('a')).toStrictEqual(true);
    });
    test('is false when param is a string without the same entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.has('b')).toStrictEqual(false);
    });
    test('is true when param is the same as the entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.has(0)).toStrictEqual(true);
    });
    test('is false when param is not the same as the entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.has(1)).toStrictEqual(false);
    });
});

describe('EnumEntry is', () => {
    test('is true when param is an EnumEntry with the same entry key', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.is(entry)).toStrictEqual(true);
    });
    test('is false when param is an EnumEntry without the same entry key', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.is(new EnumEntry('b', 1))).toStrictEqual(false);
    });
    test('is true when param is a string with the same entry key', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.is('a')).toStrictEqual(true);
    });
    test('is false when param is a string without the same entry key', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.is('b')).toStrictEqual(false);
    });
    test('is true when param is the same as the entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.is(0)).toStrictEqual(true);
    });
    test('is false when param is not the same as the entry value', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.is(1)).toStrictEqual(false);
    });
});

describe('EnumEntry toString', () => {
    test('is the EnumEntry key string', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.toString()).toStrictEqual('a');
    });
});

describe('EnumEntry toJSON', () => {
    test('is the JSON representation of an enum entry', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.toJSON()).toStrictEqual('"a"');
    });
});

describe('EnumEntry valueOf', () => {
    test('is the value of the enum entry', () => {
        const entry = new EnumEntry('a', 0);
        expect(entry.valueOf()).toStrictEqual(0);
    });
});

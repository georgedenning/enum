import Enum from './Enum.js';

describe('Enum', () => {
    test('is ok', () => {
        expect(Enum).toBeTruthy();
    });
});

describe('Enum register', () => {
    test('sets global value', () => {
        expect(global['EnumGlobal']).toBeFalsy();
        /* eslint-disable no-undef */
        expect(() => EnumGlobal).toThrow(ReferenceError);

        Enum.register('EnumGlobal');

        expect(global['EnumGlobal']).toBeTruthy();
        /* eslint-disable no-undef */
        expect(() => EnumGlobal).not.toThrow(ReferenceError);

        delete global['EnumGlobal'];
        delete window['EnumGlobal'];
    });

    test('sets window value', () => {
        expect(window['EnumWindow']).toBeFalsy();
        /* eslint-disable no-undef */
        expect(() => EnumWindow).toThrow(ReferenceError);

        Enum.register('EnumWindow');

        expect(window['EnumWindow']).toBeTruthy();
        /* eslint-disable no-undef */
        expect(() => EnumWindow).not.toThrow(ReferenceError);

        delete global['EnumWindow'];
        delete window['EnumWindow'];
    });

    test('sets default key', () => {
        expect(global['Enum']).toBeFalsy();
        Enum.register();
        expect(global['Enum']).toBeTruthy();

        delete global['Enum'];
        delete window['Enum'];
    });
});

describe('Enum constructor entries param', () => {
    test('is a required param', () => {
        expect(() => new Enum()).toThrow(TypeError);
    });
    test('throws a TypeError when entries is null', () => {
        expect(() => new Enum(null)).toThrow(TypeError);
    });
    test('throws a TypeError when entries is undefined', () => {
        expect(() => new Enum(undefined)).toThrow(TypeError);
    });
    test('throws a TypeError when entries is a number', () => {
        expect(() => new Enum(123)).toThrow(TypeError);
    });
    test('throws a TypeError when entries is a string', () => {
        expect(() => new Enum('abc')).toThrow(TypeError);
    });
    test('accepts an object', () => {
        expect(() => new Enum({ a: 0, b: 1, c: 2 })).not.toThrow(TypeError);
    });
    test('accepts an array', () => {
        expect(() => new Enum(['a', 'b', 'c'])).not.toThrow(TypeError);
    });
});

describe('Enum constructor options param', () => {
    test('is not a required param', () => {
        expect(() => new Enum(['a', 'b', 'c'])).not.toThrow(TypeError);
    });
    test('does not throw a TypeError when options is undefined', () => {
        expect(() => new Enum(['a', 'b', 'c'], undefined)).not.toThrow(TypeError);
    });
    test('does not throw a TypeError when options is a string', () => {
        expect(() => new Enum(['a', 'b', 'c'], 'abc')).not.toThrow(TypeError);
    });
    test('throws a TypeError when options is null', () => {
        expect(() => new Enum(['a', 'b', 'c'], null)).toThrow(TypeError);
    });
    test('throws a TypeError when options is a number', () => {
        expect(() => new Enum(['a', 'b', 'c'], 123)).toThrow(TypeError);
    });
    test('throws a TypeError when options is an array', () => {
        expect(() => new Enum(['a', 'b', 'c'], ['a', 'b', 'c'])).toThrow(TypeError);
    });
    test('accepts an object', () => {
        expect(() => new Enum(['a', 'b', 'c'], { a: 0, b: 1, c: 2 })).not.toThrow(TypeError);
    });
});

describe('Enum _setOptions', () => {
    test('defaults are set when options param is falsy', () => {
        const list = new Enum(['a', 'b', 'c']);
        list._setOptions({});
        expect(list._options).toStrictEqual(Enum._defaultOptions);
        list._setOptions();
        expect(list._options).toStrictEqual(Enum._defaultOptions);
    });

    test('setting the options param to a string sets options.name', () => {
        const list = new Enum(['a', 'b', 'c']);
        const name = 'enum_test_name';
        list._setOptions(name);

        expect(list._options.name).toStrictEqual(name);
    });

    test('setting the ignoreCase option sets options.ignoreCase', () => {
        const list = new Enum(['a', 'b', 'c']);
        const ignoreCase = true;
        list._setOptions({ ignoreCase });

        expect(list._options.ignoreCase).toStrictEqual(ignoreCase);
    });

    test('setting the name option sets options.name and this.name', () => {
        const list = new Enum(['a', 'b', 'c']);
        const name = 'abc';
        list._setOptions({ name });

        expect(list._options.name).toStrictEqual(name);
        expect(list.name).toStrictEqual(name);
    });
});

describe('Enum get', () => {
    test('returns undefined when key param not set', () => {
        const list = new Enum(['a', 'b', 'c']);
        expect(list.get()).toStrictEqual(undefined);
        expect(list.get(null)).toStrictEqual(undefined);
    });

    test('does not throw ReferenceError when key is valid EnumEntry', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = { key: 'a', value: 0 };
        expect(() => list.get(key)).not.toThrow(ReferenceError);
    });
    test('throws a ReferenceError when get is passed an invalid EnumEntry', () => {
        const list = new Enum(['a', 'b', 'c']);
        const entry = { key: 'd', value: 4 };
        expect(() => list.get(entry)).toThrow(ReferenceError);
    });
    test('finds correct EnumEntry when ignoreCase is true and key is valid EnumEntry', () => {
        const list = new Enum(['A', 'B', 'C'], { ignoreCase: true });
        const key = { key: 'a', value: 0 };
        expect(() => list.get(key)).not.toThrow(ReferenceError);
        expect(list.get(key)).toMatchObject({
            key: 'A',
            value: 0
        });
    });

    test('does not throw ReferenceError when key is valid string', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = 'a';
        expect(() => list.get(key)).not.toThrow(ReferenceError);
    });
    test('finds correct EnumEntry when ignoreCase is true', () => {
        const list = new Enum(['A', 'B', 'C'], { ignoreCase: true });
        const key = 'a';
        expect(() => list.get(key)).not.toThrow(ReferenceError);
        expect(list.get(key)).toMatchObject({
            key: 'A',
            value: 0
        });
    });
    test('throws a ReferenceError when key is invalid string', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = 'z';
        expect(() => list.get(key)).toThrow(ReferenceError);
    });

    test('does not throw ReferenceError when key is valid number', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = 0;
        expect(() => list.get(key)).not.toThrow(ReferenceError);
    });
    test('throws a ReferenceError when key is invalid number', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = 3;
        expect(() => list.get(key)).toThrow(ReferenceError);
    });
});

describe('Enum getKey', () => {
    test('does not throw ReferenceError when value is valid EnumEntry', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = { key: 'a', value: 0 };
        expect(() => list.getKey(key)).not.toThrow(ReferenceError);
    });
    test('throws a ReferenceError when get is passed an invalid EnumEntry', () => {
        const list = new Enum(['a', 'b', 'c']);
        const entry = { key: 'd', value: 4 };
        expect(() => list.getKey(entry)).toThrow(ReferenceError);
    });
});

describe('Enum getValue', () => {
    test('does not throw ReferenceError when value is valid EnumEntry', () => {
        const list = new Enum(['a', 'b', 'c']);
        const key = { key: 'a', value: 0 };
        expect(() => list.getValue(key)).not.toThrow(ReferenceError);
    });
    test('throws a ReferenceError when get is passed an invalid EnumEntry', () => {
        const list = new Enum(['a', 'b', 'c']);
        const entry = { key: 'd', value: 4 };
        expect(() => list.getValue(entry)).toThrow(ReferenceError);
    });
});

describe('Enum toJSON', () => {
    test('returns the JSON representation of the Enum', () => {
        const list = new Enum(['A', 'B', 'C']);
        expect(list.toJSON()).toStrictEqual('{"A":0,"B":1,"C":2}');
    });
});

describe('Enum Symbol.iterator', () => {
    test('makes Enum class iterable', () => {
        const list = new Enum(['A', 'B', 'C']);

        const iterate = () => {
            let entries = [];
            for (const entry of list) {
                entries.push(entry);
            }
        };

        expect(iterate).not.toThrow(TypeError);
    });
});

describe('Enum usability tests', () => {
    test('direct access', () => {
        const Colour = new Enum(['Green', 'Blue', 'Yellow']);

        expect(Colour.Green).toMatchObject({
            key: 'Green',
            value: 0
        });

        expect(Colour.Red).toStrictEqual(undefined);
    });

    test('access through get(key)', () => {
        const Colour = new Enum(['Green', 'Blue', 'Yellow']);

        expect(Colour.get('Green')).toMatchObject({
            key: 'Green',
            value: 0
        });

        expect(() => Colour.get('Red')).toThrow(ReferenceError);
    });

    test('access through get(value)', () => {
        const Colour = new Enum(['Green', 'Blue', 'Yellow']);

        expect(Colour.get(0)).toMatchObject({
            key: 'Green',
            value: 0
        });

        expect(() => Colour.get(3)).toThrow(ReferenceError);
    });
});

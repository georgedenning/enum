![NPM License](https://img.shields.io/npm/l/@gden/enum?label=)

<!-- ![NPM Downloads](https://img.shields.io/npm/dw/@gden/enum?label=) -->

# Installation

Using npm:

```shell
npm install @gden/enum
```

Import the package in your ES6 project:

```js
import { Enum } from '@gden/enum';
```

or require it with CommonJS:

```js
const { Enum } = require('@gden/enum');
```

# Usage

```js
import { Enum } from '@gden/enum';

const Colour = new Enum(['Green', 'Blue', 'Yellow']);
```

Optionally, you can register `Enum` to make it available on the `global` or `window` object:

```js
/**
 * @param {String} key - defaults to "Enum"
 */
Enum.register(key);
```

# API

```js
/**
 * @param {Array|Object} entries
 * @param {Object|String} options (optional)
 */
new Enum(entries, options);
```

## Entries

Every new instantiation of an Enum requires an array of strings or an object with key => value pairs.

### Create a new Enum with an array:

```js
new Enum(['Green', 'Blue', 'Yellow']);
```

### Create a new Enum with an object:

```js
new Enum({ Green: 0, Blue: 1, Yellow: 2 });
```

## Options

Optionally, you can pass an options object to the constructor.

```js
const options = {
    /**
     * The name of the Enum
     * @type String
     */
    name: undefined,
    /**
     * Case-insensitive access to Enum entries
     * @type Boolean
     */
    ignoreCase: false
};
```

## Examples

```js
const Colour = new Enum({ Green: 0, Blue: 1, Yellow: 2 });

/**
 * Get the EnumEntry direct
 * @returns {EnumEntry}  { key: 'Green', value: 0 }
 */
Colour.Green;

/**
 * Get the EnumEntry by calling `get` method with a key
 * @returns {EnumEntry}  { key: 'Green', value: 0 }
 */
Colour.get('Green');

/**
 * Get the EnumEntry by calling `get` method with a value
 * @returns {EnumEntry}  { key: 'Green', value: 0 }
 */
Colour.get(0);

/**
 * Get the EnumEntry key by calling `getKey` method
 * @returns {String}  'Green'
 */
Colour.getKey('Green');
// or
Colour.getKey(0);

/**
 * Get the EnumEntry value by calling `getValue` method
 * @returns {Number}  0
 */
Colour.getValue(0);
// or
Colour.getValue('Green');

/**
 * Trying to access an EnumEntry that doesn't exist directly
 * @returns undefined
 */
Colour.Red;

/**
 * Trying to access an EnumEntry that doesn't exist using the `get` method
 * @throws {ReferenceError}  "Red" is not a valid enum entry key
 */
Colour.get('Red');
```

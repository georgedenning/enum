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

---

# Usage

Optionally, you can register `Enum` to make it available on the `global` or `window` object:

```js
/**
 * @param {String} key - defaults to "Enum"
 */
Enum.register(key);
```

After registration, you can use `Enum` anywhere in your project by accessing it through `global.Enum` or `window.Enum` or just `Enum`.

## API

Params

```js

```

```js
const Colour = new Enum(['Green', 'Blue', 'Yellow']);

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

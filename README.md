![NPM License](https://img.shields.io/npm/l/@gden/enum?label=)
![NPM Downloads](https://img.shields.io/npm/dw/@gden/enum?label=)

# Installation

Install the package with npm:

```shell
npm install @gden/enum
```

Start using Enums in your project:

## ES6 Import

```js
import Enum from '@gden/enum';
```

## Common JS

```js
const Enum = require('@gden/enum');
```

---

# Usage

```js
// index.js

import Enum from '@gden/enum';

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

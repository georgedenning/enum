![NPM License](https://img.shields.io/npm/l/@georgedenning/enums?label=)
![NPM Downloads](https://img.shields.io/npm/dw/@georgedenning/enums?label=)

# Installation

Install the package with npm:

```shell
$ npm install @gden/enums
```

Start using Enums in your project:

## ES6 Import

```js
import Enum from '@gden/enums';
```

## Common JS

```js
const Enum = require('@gden/enums');
```

---

# Usage

```js
// index.js

import Enum from '@gden/enums';

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

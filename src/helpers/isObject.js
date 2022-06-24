import isType from './isType.js';
import isArray from './isArray.js';
import isNull from './isNull.js';

export default value => isType('object', value) && !isArray(value) && !isNull(value);

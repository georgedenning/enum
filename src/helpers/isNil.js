import isUndefined from './isUndefined.js';
import isNull from './isNull.js';

export default value => isUndefined(value) || isNull(value);

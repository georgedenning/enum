import isType from './isType';
import isArray from './isArray';
import isNull from './isNull';

export default value => isType('object', value) && !isArray(value) && !isNull(value);

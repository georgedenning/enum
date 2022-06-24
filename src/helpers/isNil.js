import isUndefined from './isUndefined';
import isNull from './isNull';

export default value => isUndefined(value) || isNull(value);

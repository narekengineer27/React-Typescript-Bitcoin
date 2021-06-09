import * as _ from 'lodash';

export const mergeWithoutNull = (dest: object, src: object) => {
  const merged = { ...dest };
  !_.isEmpty(src) && Object.keys(src).forEach(key => {
    if (src[key] !== null) {
      merged[key] = src[key];
    }
  });
  return merged as any;
};

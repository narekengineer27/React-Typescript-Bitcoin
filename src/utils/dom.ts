import * as _ from 'lodash';

export const offset = (element) => {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
  };
};

export const removeHtmlTags = (str) => {
  return _.isString(str) ? str.replace(/<[^>]*>/g, '') : str;
};

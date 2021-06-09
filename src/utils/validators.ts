import * as validator from 'validator';

export const isProvided = (val: any) => {
  if (val == null) {
    return false;
  }

  const v = '' + val;
  return v && v.length;
};

export const isEmail = (val: string) => {
  return validator.isEmail(val);
};

export const isLength = (val: string, options: any) => {
  return validator.isLength(val, options);
};

export const isMobilePhone = (val: string) => {
  return validator.isMobilePhone(val.replace(/\D/g, ''), 'any');
};

export const isNumber = (val: string) => {
  return !isNaN(Number(val));
};

export const isPositiveNumber = (val: any) => {
  const n = Number(val);
  return !isNaN(n) && n >= 0;
};

export const isStrictlyPositiveNumber = (val: any) => {
  const n = Number(val);
  return !isNaN(n) && n > 0;
};

export const isRatio = (val: any) => {
  return validator.matches(val, '^(100([\.][0]{1,})?$|[0-9]{1,2}([\.][0-9]{1,})?)$', '');
};


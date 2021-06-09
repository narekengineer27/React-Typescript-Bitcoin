import { getUserCurrency } from 'Utils/auth';

// Convert a scientific number into decimal.
const scientificToDecimal = (num) => {
  const data = ('' + num).split(/[eE]/);
  if (data.length === 1) {
    return data[0];
  }

  let z = '', sign = num < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) {
      z += '0';
    }
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) {
    z += '0';
  }
  return str + z;

};

// Round a number to be 8 digits after the dot.
export const round = (n: any, nDigitsAfterDot: number = 8) => {
  let copyN = '' + scientificToDecimal(n);
  let rounded = '' + scientificToDecimal(n);
  const re = new RegExp(`\\.[0-9]{${nDigitsAfterDot}}(\\d*)`, 'g');
  copyN.replace(re, (a: string, trailingDigits: string) => {
    if (trailingDigits) {
      const lastIndex = copyN.lastIndexOf(trailingDigits);
      rounded = copyN.substring(0, lastIndex);
    }
    return '';
  });
  return rounded.replace(/\.0*$/g, '').replace( /[^\d\.\-]*/g, '');
};

export const rate2ConvertBtc2Local = (btc2usd: number = 0, currencyRates = []) => {
  const local = getUserCurrency();
  const rate = currencyRates.find((r) => {
    return r.target === local;
  }) || {};
  return btc2usd * (rate.rate || 0);
};

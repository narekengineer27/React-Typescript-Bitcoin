import { Status } from 'Models/Status';

export const MANUAL_TRADING_ROBOT_SWITCH_MODE = 'MANUAL_TRADING_ROBOT_SWITCH_MODE';
export const MANUAL_TRADING_ROBOT_TOTAL = 'MANUAL_TRADING_ROBOT_TOTAL';
export const MANUAL_TRADING_ROBOT_TOTAL_STATUS = 'MANUAL_TRADING_ROBOT_TOTAL_STATUS';
export const MANUAL_TRADING_ROBOT_TRADES = 'MANUAL_TRADING_ROBOT_TRADES';
export const MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION = 'MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION';

export const boards = [{
  label: 'Monitoring Board',
  value: 'monitor',
  href: '/mtr/monitor',
}, {
  label: 'Watch List',
  value: 'watchlist',
  href: '/mtr/watchlist',
}];

export type IState = {
  mode: string,
  total: {
    data: object,
    status: Status,
  },
  currencyConversion: {
    status: Status,
    btc2usd: number,
    btc2usdExpiration?: Date,
    currencyRates: object[],
    currencyRatesExpiration?: Date,
    currencyToUsd: {[id: string]: number},
    currencyList: string[]
  }
};

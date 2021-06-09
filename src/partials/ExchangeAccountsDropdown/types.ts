import { Status } from 'Models/Status';
import { ExchangeAccount } from 'Models/ExchangeAccount';
import { Exchange } from 'Models/Exchange';

export const MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS = 'MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS';
export const MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS = 'MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS';
export const MANUAL_TRADING_ROBOT_EXCHANGES = 'MANUAL_TRADING_ROBOT_EXCHANGES';
export const MANUAL_TRADING_ROBOT_EXCHANGES_STATUS = 'MANUAL_TRADING_ROBOT_EXCHANGES_STATUS';
export const MANUAL_TRADING_ROBOT_SET_ACTIVE_EXCHANGE_ACCOUNT = 'MANUAL_TRADING_ROBOT_SET_ACTIVE_EXCHANGE_ACCOUNT';

export type IState = {
  exchangeAccounts: {
    data: ExchangeAccount[],
    status: Status,
    firstLoad: boolean,
  },
  exchanges: {
    data: Exchange[],
    status: Status,
  },
  activeExchangeAccount: {
    data: ExchangeAccount,
    status: Status,
  },
};

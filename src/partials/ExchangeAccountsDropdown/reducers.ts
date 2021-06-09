import { Status } from 'Models/Status';
import {
  MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS,
  MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS,
  MANUAL_TRADING_ROBOT_EXCHANGES,
  MANUAL_TRADING_ROBOT_EXCHANGES_STATUS,
  MANUAL_TRADING_ROBOT_SET_ACTIVE_EXCHANGE_ACCOUNT,
  IState,
} from './types';

const initialState: IState = {
  exchangeAccounts: {
    data: [],
    status: new Status(),
    firstLoad: true,
  },
  exchanges: {
    data: [],
    status: new Status(),
  },
  activeExchangeAccount: {
    data: {},
    status: new Status(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS:
      return {
        ...state,
        exchangeAccounts: {
          ...state.exchangeAccounts,
          data: action.payload,
          firstLoad: false,
        },
      };
    case MANUAL_TRADING_ROBOT_EXCHANGE_ACCOUNTS_STATUS:
      return {
        ...state,
        exchangeAccounts: {
          ...state.exchangeAccounts,
          status: action.payload,
        },
      };
    case MANUAL_TRADING_ROBOT_EXCHANGES:
      // TODO remove fake colors
      for (const exchange of action.payload) {
        exchange.color = ('' + exchange.name).toLowerCase() === 'bittrex' ? '#ffa033' : '#4fa3ff';
      }

      return {
        ...state,
        exchanges: {
          ...state.exchanges,
          data: action.payload,
        },
      };
    case MANUAL_TRADING_ROBOT_EXCHANGES_STATUS:
      return {
        ...state,
        exchanges: {
          ...state.exchanges,
          status: action.payload,
        },
      };
    case MANUAL_TRADING_ROBOT_SET_ACTIVE_EXCHANGE_ACCOUNT:
      return {
        ...state,
        activeExchangeAccount: {
          data: action.payload,
          status: Status.createSuccess(),
        }
      };
    default:
      return {
        ...state,
      };
  }
};

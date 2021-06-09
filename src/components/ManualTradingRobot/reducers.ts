import { Status } from 'Models/Status';
import {
  MANUAL_TRADING_ROBOT_SWITCH_MODE,
  MANUAL_TRADING_ROBOT_TRADES,
  MANUAL_TRADING_ROBOT_TOTAL,
  MANUAL_TRADING_ROBOT_TOTAL_STATUS,
  MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION,
  IState,
} from './types';
import { loadMode } from 'Utils/persistSettings';

const initialState: IState = {
  mode: loadMode(),
  total: {
    data: {},
    status: new Status(),
  },
  currencyConversion: {
    status: new Status(),
    btc2usd: 0,
    currencyRates: [],
    currencyToUsd: {},
    currencyList: [],
  }
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MANUAL_TRADING_ROBOT_TOTAL:
      return {
        ...state,
        total: {
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case MANUAL_TRADING_ROBOT_TOTAL_STATUS:
      return {
        ...state,
        total: {
          ...state.total,
          status: action.payload,
        }
      };
    case MANUAL_TRADING_ROBOT_SWITCH_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case MANUAL_TRADING_ROBOT_TRADES:
      return {
        ...state,
      };
    case MANUAL_TRADING_ROBOT_CURRENCY_CONVERSION:
      return {
        ...state,
        currencyConversion: {...state.currencyConversion, ...action.payload,}
      };
    default:
      return {
        ...state,
      };
  }
};

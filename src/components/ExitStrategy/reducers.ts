import { Status } from 'Models/Status';
import { Trade } from 'Models/Trade';
import {
  EXIT_STRATEGY_TRADE,
  EXIT_STRATEGY_STATUS,
  EXIT_STRATEGY_DEFAULTS,
  EXIT_STRATEGY_DEFAULTS_STATUS,
  EXIT_STRATEGY_SET_AS_DEFAULT,
  EXIT_STRATEGY_SET_FROM,
  IState
} from './types';

const initialState: IState = {
  status: new Status(),
  trade: new Trade(),
  defaultSettings: {
    data: {},
    status: new Status(),
  },
  setAsDefault: false,
  from: '',
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case EXIT_STRATEGY_TRADE:
      return {
        ...state,
        trade: action.payload,
      };
    case EXIT_STRATEGY_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case EXIT_STRATEGY_DEFAULTS:
      return {
        ...state,
        defaultSettings: {
          ...state.defaultSettings,
          data: action.payload,
        },
      };
    case EXIT_STRATEGY_DEFAULTS_STATUS:
      return {
        ...state,
        defaultSettings: {
          ...state.defaultSettings,
          status: action.payload,
        },
      };
    case EXIT_STRATEGY_SET_AS_DEFAULT:
      return {
        ...state,
        setAsDefault: action.payload,
      };
    case EXIT_STRATEGY_SET_FROM:
      return {
        ...state,
        from: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

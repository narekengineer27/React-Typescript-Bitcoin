import { Status } from 'Models/Status';
import { WatchCoin } from 'Models/WatchCoin';
import {
  WATCH_LIST_ADD,
  WATCH_LIST_ADD_CANCEL,
  WATCH_LIST_ADD_STATUS,
  WATCH_LIST_ADD_SWITCH_TAB,
  WATCH_LIST_UPDATE_COIN,
  WATCH_LIST_UPDATE_STATUS,
  WATCH_LIST_UPDATE_CANCEL,
  WatchCoinTabs,
  IState,
} from './types';

const initialState: IState = {
  add: {
    status: new Status(),
    coin: new WatchCoin(),
    tab: WatchCoinTabs.TradingParameters,
  },
  update: {
    status: new Status(),
    coin: new WatchCoin(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case WATCH_LIST_ADD_STATUS:
      return {
        ...state,
        add: {
          ...state.add,
          status: action.payload,
        },
      };
    case WATCH_LIST_ADD:
      return {
        ...state,
        add: {
          ...state.add,
          status: Status.createProgressing(),
          coin: action.payload,
        },
      };
    case WATCH_LIST_ADD_CANCEL:
      return {
        ...state,
        add: {
          ...state.add,
          status: new Status(),
          coin: new WatchCoin(),
        },
      };
    case WATCH_LIST_ADD_SWITCH_TAB:
      return {
        ...state,
        add: {
          ...state.add,
          tab: action.payload,
        },
      };
    case WATCH_LIST_UPDATE_COIN:
      return {
        ...state,
        update: {
          ...state.update,
          coin: action.payload,
        },
      };
    case WATCH_LIST_UPDATE_STATUS:
      return {
        ...state,
        update: {
          ...state.update,
          status: action.payload,
        },
      };
    case WATCH_LIST_UPDATE_CANCEL:
      return {
        ...state,
        update: {
          ...state.update,
          status: new Status(),
        },
      };
    default:
      return {
        ...state,
      };
  }
};

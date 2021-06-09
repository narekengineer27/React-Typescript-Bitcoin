import { WatchCoin } from 'Models/WatchCoin';
import { Status } from 'Models/Status';

export const WATCH_LIST_ADD = 'WATCH_LIST_ADD';
export const WATCH_LIST_ADD_CANCEL = 'WATCH_LIST_ADD_CANCEL';
export const WATCH_LIST_ADD_STATUS = 'WATCH_LIST_ADD_STATUS';
export const WATCH_LIST_ADD_SWITCH_TAB = 'WATCH_LIST_ADD_SWITCH_TAB';
export const WATCH_LIST_UPDATE_COIN = 'WATCH_LIST_UPDATE_COIN';
export const WATCH_LIST_UPDATE_STATUS = 'WATCH_LIST_UPDATE_STATUS';
export const WATCH_LIST_UPDATE_CANCEL = 'WATCH_LIST_UPDATE_CANCEL';

export enum WatchCoinTabs {
  TradingParameters,
  MonitoringInterval,
}

export enum WatchListTabs {
  Buying = 'buying',
  Selling = 'selling',
}

export type IState = {
  add: {
    status: Status,
    coin: WatchCoin,
    tab: WatchCoinTabs,
  },
  update: {
    status: Status,
    coin: WatchCoin,
  },
};

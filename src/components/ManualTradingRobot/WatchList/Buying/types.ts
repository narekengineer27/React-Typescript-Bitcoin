import { WatchCoin } from 'Models/WatchCoin';
import { Meta } from 'Models/Meta';
import { Status } from 'Models/Status';
import { Page } from 'Models/Page';

export const WATCH_LIST_BUYING = 'WATCH_LIST_BUYING';
export const WATCH_LIST_BUYING_DATA = 'WATCH_LIST_BUYING_DATA';
export const WATCH_LIST_BUYING_STATUS = 'WATCH_LIST_BUYING_STATUS';
export const WATCH_LIST_BUYING_CLEAR = 'WATCH_LIST_BUYING_CLEAR';
export const WATCH_LIST_BUYING_REMOVE = 'WATCH_LIST_BUYING_REMOVE';
export const WATCH_LIST_BUYING_REMOVE_CANCEL = 'WATCH_LIST_BUYING_REMOVE_CANCEL';
export const WATCH_LIST_BUYING_REMOVE_STATUS = 'WATCH_LIST_BUYING_REMOVE_STATUS';
export const WATCH_LIST_BUYING_MOBILE_PAGINATION = 'WATCH_LIST_BUYING_MOBILE_PAGINATION';
export const WATCH_LIST_BUYING_MOBILE_SORT = 'WATCH_LIST_BUYING_MOBILE_SORT';

export type IState = {
  data: WatchCoin[],
  meta: Meta,
  status: Status,
  sort: String,
  mobilePage: Page,
  remove: {
    status: Status,
    coin: WatchCoin,
  },
};

import { WatchCoin } from 'Models/WatchCoin';
import { Meta } from 'Models/Meta';
import { Status } from 'Models/Status';
import { Page } from 'Models/Page';

export const WATCH_LIST_SELLING = 'WATCH_LIST_SELLING';
export const WATCH_LIST_SELLING_DATA = 'WATCH_LIST_SELLING_DATA';
export const WATCH_LIST_SELLING_STATUS = 'WATCH_LIST_SELLING_STATUS';
export const WATCH_LIST_SELLING_CLEAR = 'WATCH_LIST_SELLING_CLEAR';
export const WATCH_LIST_SELLING_REMOVE = 'WATCH_LIST_SELLING_REMOVE';
export const WATCH_LIST_SELLING_REMOVE_CANCEL = 'WATCH_LIST_SELLING_REMOVE_CANCEL';
export const WATCH_LIST_SELLING_REMOVE_STATUS = 'WATCH_LIST_SELLING_REMOVE_STATUS';
export const WATCH_LIST_SELLING_MOBILE_PAGINATION = 'WATCH_LIST_SELLING_MOBILE_PAGINATION';
export const WATCH_LIST_SELLING_MOBILE_SORT = 'WATCH_LIST_SELLING_MOBILE_SORT';

export type IState = {
  data: WatchCoin[],
  meta: Meta,
  status: Status,
  sort: string,
  remove: {
    status: Status,
    coin: WatchCoin,
  },
  mobilePage: Page,
};

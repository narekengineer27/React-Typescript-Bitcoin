import { Trade } from 'Models/Trade';
import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';

export const TRADES_TABLE = 'TRADES_TABLE';
export const TRADES_TABLE_STATUS = 'TRADES_TABLE_STATUS';
export const TRADES_TABLE_ERROR = 'TRADES_TABLE_ERROR';
export const TRADES_TABLE_MOBILE_FILTER = 'TRADES_TABLE_MOBILE_FILTER';
export const TRADES_TABLE_MOBILE_SORT = 'TRADES_TABLE_MOBILE_SORT';
export const TRADES_TABLE_DELETE_STATUS = 'TRADES_TABLE_DELETE_STATUS';
export const TRADES_TABLE_DELETED_TRADE = 'TRADES_TABLE_DELETED_TRADE';
export const TRADES_TABLE_CANCEL_STATUS = 'TRADES_TABLE_CANCEL_STATUS';
export const TRADES_TABLE_CANCELLED_ORDER = 'TRADES_TABLE_CANCELLED_ORDER';

export type IState = {
  data: Trade[],
  meta: Meta,
  status: Status,
  mobileFilterVisible: boolean,
  mobileSortVisible: boolean,
  deleteStatus: Status,
  deletedTrade: Trade,
  cancelStatus: Status,
  cancelledOrder: Trade,
};

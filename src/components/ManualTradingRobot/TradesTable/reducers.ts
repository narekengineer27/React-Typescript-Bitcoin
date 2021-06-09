import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';
import {
  TRADES_TABLE,
  TRADES_TABLE_STATUS,
  TRADES_TABLE_MOBILE_FILTER,
  TRADES_TABLE_MOBILE_SORT,
  TRADES_TABLE_DELETE_STATUS,
  TRADES_TABLE_DELETED_TRADE,
  TRADES_TABLE_CANCEL_STATUS,
  TRADES_TABLE_CANCELLED_ORDER,
  IState,
} from './types';

const initialState: IState = {
  data: [],
  meta: new Meta(),
  status: new Status(),
  mobileFilterVisible: false,
  mobileSortVisible: false,
  deleteStatus: new Status(),
  deletedTrade: {},
  cancelStatus:  new Status(),
  cancelledOrder: {},
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case TRADES_TABLE:
      return {
        ...state,
        ...action.payload,
        status: Status.createSuccess(),
      };
    case TRADES_TABLE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case TRADES_TABLE_MOBILE_FILTER:
      return {
        ...state,
        mobileFilterVisible: action.payload,
      };
    case TRADES_TABLE_MOBILE_SORT:
      return {
        ...state,
        mobileSortVisible: action.payload,
      };
    case TRADES_TABLE_DELETE_STATUS:
      return {
        ...state,
        deleteStatus: action.payload,
      };
    case TRADES_TABLE_DELETED_TRADE:
      return {
        ...state,
        deletedTrade: action.payload,
      };
    case TRADES_TABLE_CANCEL_STATUS:
      return {
        ...state,
        cancelStatus: action.payload,
      };
    case TRADES_TABLE_CANCELLED_ORDER:
      return {
        ...state,
        cancelledOrder: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

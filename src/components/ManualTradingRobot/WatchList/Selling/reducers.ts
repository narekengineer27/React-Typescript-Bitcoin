import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';
import { WatchCoin } from 'Models/WatchCoin';
import { Page } from 'Models/Page';
import {
  WATCH_LIST_SELLING,
  WATCH_LIST_SELLING_DATA,
  WATCH_LIST_SELLING_STATUS,
  WATCH_LIST_SELLING_CLEAR,
  WATCH_LIST_SELLING_REMOVE,
  WATCH_LIST_SELLING_REMOVE_CANCEL,
  WATCH_LIST_SELLING_REMOVE_STATUS,
  WATCH_LIST_SELLING_MOBILE_PAGINATION,
  WATCH_LIST_SELLING_MOBILE_SORT,
  IState
} from './types';

const initialState: IState = {
  data: [],
  meta: new Meta(),
  status: new Status(),
  sort: '',
  remove: {
    status: new Status(),
    coin: new WatchCoin(),
  },
  mobilePage: new Page(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case WATCH_LIST_SELLING:
      return {
        ...state,
        data: action.payload,
        status: Status.createSuccess(),
      };
    case WATCH_LIST_SELLING_DATA:
      return {
        ...state,
        data: [ ...action.payload ],
      };
    case WATCH_LIST_SELLING_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case WATCH_LIST_SELLING_CLEAR:
      return {
        ...state,
        data: [],
      };
    case WATCH_LIST_SELLING_REMOVE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: Status.createProgressing(),
          coin: action.payload,
        },
      };
    case WATCH_LIST_SELLING_REMOVE_CANCEL:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: new Status(),
          coin: new WatchCoin(),
        },
      };
    case WATCH_LIST_SELLING_REMOVE_STATUS:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: action.payload,
        },
      };
    case WATCH_LIST_SELLING_MOBILE_PAGINATION:
      return {
        ...state,
        mobilePage: action.payload,
      };
    case WATCH_LIST_SELLING_MOBILE_SORT:
      return {
        ...state,
        sort: action.payload + ',' + state.sort,
      };
    default:
      return {
        ...state,
      };
  }
};

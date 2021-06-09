import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';
import { WatchCoin } from 'Models/WatchCoin';
import { Page } from 'Models/Page';
import {
  WATCH_LIST_BUYING,
  WATCH_LIST_BUYING_DATA,
  WATCH_LIST_BUYING_STATUS,
  WATCH_LIST_BUYING_CLEAR,
  WATCH_LIST_BUYING_REMOVE,
  WATCH_LIST_BUYING_REMOVE_CANCEL,
  WATCH_LIST_BUYING_REMOVE_STATUS,
  WATCH_LIST_BUYING_MOBILE_PAGINATION,
  WATCH_LIST_BUYING_MOBILE_SORT,
  IState,
} from './types';

const initialState: IState = {
  data: [],
  meta: new Meta(),
  status: new Status(),
  mobilePage: new Page(),
  sort: '',
  remove: {
    status: new Status(),
    coin: new WatchCoin(),
  },
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case WATCH_LIST_BUYING:
      return {
        ...state,
        ...action.payload,
        status: Status.createSuccess(),
      };
    case WATCH_LIST_BUYING_DATA:
      return {
        ...state,
        data: [ ...action.payload ],
      };
    case WATCH_LIST_BUYING_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case WATCH_LIST_BUYING_MOBILE_PAGINATION:
      return {
        ...state,
        mobilePage: action.payload,
      };
    case WATCH_LIST_BUYING_MOBILE_SORT:
      return {
        ...state,
        sort: action.payload + ',' + state.sort,
      };
    case WATCH_LIST_BUYING_CLEAR:
      return {
        ...state,
        data: [],
      };
    case WATCH_LIST_BUYING_REMOVE:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: Status.createProgressing(),
          coin: action.payload,
        },
      };
    case WATCH_LIST_BUYING_REMOVE_CANCEL:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: new Status(),
          coin: new WatchCoin(),
        },
      };
    case WATCH_LIST_BUYING_REMOVE_STATUS:
      return {
        ...state,
        remove: {
          ...state.remove,
          status: action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

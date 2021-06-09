import * as api from 'Utils/api';
import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { WatchCoin } from 'Models/WatchCoin';
import { Meta } from 'Models/Meta';
import { openExitStrategy } from 'Components/ExitStrategy/actions';
import { tailorMobilePage } from 'Utils/actions';
import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
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
} from './types';

const MSG_REMOVE_ERROR = {};
const MSG_REMOVE_SUCCESS = {};
const MSG_UPDATEWATCHLIST_ERROR = {};
const MSG_FETCHWATCHLIST_ERROR = {};

export const startConfig = (trade, existingTrades) => {
  return (dispatch) => {
    trade.loadingConfigs = true;
    dispatch(createAction(WATCH_LIST_SELLING_DATA, existingTrades));
    api.fetchSellingWatchListRule(trade.id)
      .then(response => {
        trade.loadingConfigs = false;
        dispatch(createAction(WATCH_LIST_SELLING_DATA, existingTrades));
        dispatch(openExitStrategy({
          id: trade.id,
          smart_sell_enabled: 1,
          ...response.data,
        }));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_UPDATEWATCHLIST_ERROR));
      });
  };
};

export const clearWatchList = () => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_SELLING_CLEAR));
  };
};

export const removeCoin = (coin: WatchCoin) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_SELLING_REMOVE, coin));
  };
};

export const cancelRemove = () => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_SELLING_REMOVE_CANCEL));
  };
};

export const confirmRemove = (id: number, existingCoins = [], mobilePage = null) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_SELLING_REMOVE_STATUS, {
      progressing: true,
      loading: true,
    }));

    api.removeCoin(id)
      .then((response) => {
        _.remove(existingCoins, (coin) => {
          return coin.id === id;
        });
        dispatch(createAction(WATCH_LIST_SELLING_DATA, existingCoins));
        dispatch(hideMessage(MSG_REMOVE_ERROR));
        mobilePage && dispatch(mobileGoToPage(existingCoins, (mobilePage.offset / mobilePage.limit) + 1));
        dispatch(createAction(WATCH_LIST_SELLING_REMOVE_STATUS, Status.createSuccess()));
        dispatch(showMessage(
          'You have removed the coin from the watchlist successfully!',
          'success',
          MSG_REMOVE_SUCCESS,
        ));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_REMOVE_ERROR));
        dispatch(createAction(WATCH_LIST_SELLING_REMOVE_STATUS, Status.createProgressing()));
      });
  };
};

export const fetchWatchList = (exchangeId, mode, meta = new Meta(), mobilePage = null) => {
  return (dispatch) => {
    meta.mode = mode;
    meta.page.limit = 10000;
    dispatch(createAction(WATCH_LIST_SELLING_STATUS, Status.createLoading()));
    api.fetchWatchList(exchangeId, meta, 'sell')
      .then(response => {
        dispatch(createAction(WATCH_LIST_SELLING, response.data));
        mobilePage && dispatch(mobileGoToPage(response.data, (mobilePage.offset / mobilePage.limit) + 1));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_FETCHWATCHLIST_ERROR));
      });
  };
};

export const updateFieldValue = (coin, field, value, coins) => {
  return (dispatch) => {
    coin[field] = value ? 1 : 0;
    coin[field + 'Loading'] = true;
    dispatch(createAction(WATCH_LIST_SELLING_DATA, coins));
    api.updateWatchList(coin.id, { [field]: value ? '1' : '0' })
      .then(response => {
        coin[field + 'Loading'] = false;
        dispatch(createAction(WATCH_LIST_SELLING_DATA, coins));
      })
      .catch(error => {
        coin[field + 'Loading'] = false;
        coin[field] = value ? 0 : 1;
        dispatch(createAction(WATCH_LIST_SELLING_DATA, coins));
        dispatch(showMessage(error, 'error', MSG_UPDATEWATCHLIST_ERROR));
      });
  };
};

export const mobileShowMore = (coins, coin) => {
  return (dispatch) => {
    coin.showMore = true;
    dispatch(createAction(WATCH_LIST_SELLING, coins));
  };
};

export const mobileShowLess = (coins, coin) => {
  return (dispatch) => {
    coin.showMore = false;
    dispatch(createAction(WATCH_LIST_SELLING, coins));
  };
};

export const mobileGoToPage = (coins: any, pageNo: number = 1) => {
  return (dispatch) => {
    const page = tailorMobilePage(coins.length, pageNo);
    dispatch(createAction(WATCH_LIST_SELLING_MOBILE_PAGINATION, page));
  };
};

export const doSort = (sortValue: string) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_SELLING_MOBILE_SORT, sortValue));
  };
};

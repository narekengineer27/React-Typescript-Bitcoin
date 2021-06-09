import * as api from "Utils/api";
import * as _ from 'lodash';
import { createAction } from "Models/Action";
import { Status } from "Models/Status";
import { WatchCoin } from "Models/WatchCoin";
import { tailorMobilePage } from 'Utils/actions';
import { showMessage, hideMessage, hideAllMessages } from "Components/GlobalMessage/actions";
import {
  WATCH_LIST_BUYING,
  WATCH_LIST_BUYING_DATA,
  WATCH_LIST_BUYING_STATUS,
  WATCH_LIST_BUYING_CLEAR,
  WATCH_LIST_BUYING_REMOVE,
  WATCH_LIST_BUYING_REMOVE_CANCEL,
  WATCH_LIST_BUYING_REMOVE_STATUS,
  WATCH_LIST_BUYING_MOBILE_PAGINATION,
  WATCH_LIST_BUYING_MOBILE_SORT
} from "./types";
import { Meta } from "Models/Meta";

const MSG_REMOVE_SUCCESS = {};
const MSG_FETCHWATCHLIST_ERROR = {};
const MSG_UPDATEWATCHLIST_ERROR = {};
const MSG_REMOVE_ERROR = {};
const MSG_FETCHHISTORY_ERROR = {};

export const clearWatchList = () => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_BUYING_CLEAR));
  };
};

export const removeCoin = (coin: WatchCoin) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_BUYING_REMOVE, coin));
  };
};

export const cancelRemove = () => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_BUYING_REMOVE_CANCEL));
  };
};

export const mobileGoToPage = (coins: any, pageNo: number = 1) => {
  return (dispatch) => {
    const page = tailorMobilePage(coins.length, pageNo);
    dispatch(createAction(WATCH_LIST_BUYING_MOBILE_PAGINATION, page));
  };
};

export const confirmRemove = (id: number, existingCoins = [], mobilePage = null) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_BUYING_REMOVE_STATUS, {
      progressing: true,
      loading: true,
    }));

    api.removeCoin(id)
      .then(() => {
        _.remove(existingCoins, (coin) => {
          return coin.id === id;
        });
        dispatch(createAction(WATCH_LIST_BUYING_DATA, existingCoins));
        mobilePage && dispatch(mobileGoToPage(existingCoins, (mobilePage.offset / mobilePage.limit) + 1));
        dispatch(createAction(WATCH_LIST_BUYING_REMOVE_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_REMOVE_ERROR));
        dispatch(showMessage(
          'You have removed the coin from the watchlist successfully!',
          'success',
          MSG_REMOVE_SUCCESS,
        ));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_REMOVE_ERROR));
        dispatch(createAction(WATCH_LIST_BUYING_REMOVE_STATUS, Status.createProgressing()));
      });
  };
};

export const updateCoins = (coins = []) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
  };
};

export const fetchWatchList = (exchangeId, mode, meta = new Meta(), mobilePage = null) => {
  return (dispatch) => {
    meta.mode = mode;
    meta.page.limit = 10000;
    dispatch(createAction(WATCH_LIST_BUYING_STATUS, Status.createLoading()));
    dispatch(hideAllMessages());
    api.fetchWatchList(exchangeId, meta)
      .then(response => {
        response.data = response.data.map(coin => {
          const rule = coin.rule || {};
          for (const key of Object.keys(rule)) {
            if (key.indexOf('follow_') === 0) {
              rule[key] = !!rule[key];
            }
          }
          return coin;
        });
        mobilePage && dispatch(mobileGoToPage(response.data, (mobilePage.offset / mobilePage.limit) + 1));
        dispatch(createAction(WATCH_LIST_BUYING, response));
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
    dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
    api.updateWatchList(coin.id, { [field]: value ? '1' : '0' })
      .then(response => {
        coin[field + 'Loading'] = false;
        dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
      })
      .catch(error => {
        coin[field + 'Loading'] = false;
        coin[field] = value ? 0 : 1;
        dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
        dispatch(showMessage(error, 'error', MSG_UPDATEWATCHLIST_ERROR));
      });
  };
};

export const fetchHistory = (coins, coin, expanded = false) => {
  return (dispatch) => {
    if (coin.history) {
      coin.expanded = expanded;
      dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
    } else {
      coin.loading = true;
      dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
      api.fetchWatchListHistory(coin.id)
        .then(response => {
          coin.history = response.data;
          coin.expanded = true;
          coin.loading = false;
          dispatch(createAction(WATCH_LIST_BUYING_DATA, coins));
        })
        .catch((error) => {
          coin.loading = false;
          dispatch(showMessage(error, 'error', MSG_FETCHHISTORY_ERROR));
        });
    }
  };
};

export const doSort = (sortValue: string) => {
  return (dispatch) => {
    dispatch(createAction(WATCH_LIST_BUYING_MOBILE_SORT, sortValue));
  };
};

import * as api from 'Utils/api';
import { Trade } from 'Models/Trade';
import { Meta } from 'Models/Meta';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';

import {
  TRADES_TABLE,
  TRADES_TABLE_STATUS,
  TRADES_TABLE_ERROR,
  TRADES_TABLE_MOBILE_FILTER,
  TRADES_TABLE_MOBILE_SORT,
  TRADES_TABLE_DELETE_STATUS,
  TRADES_TABLE_DELETED_TRADE,
  TRADES_TABLE_CANCEL_STATUS,
  TRADES_TABLE_CANCELLED_ORDER,
} from './types';

import { showMessage, hideMessage } from '../../GlobalMessage/actions';

const MSG_CANCEL = {};
const MSG_SUCCESS = {};
const MSG_DELETE_ERROR = {};

export const mobileShowFilter = () => {
  return (dispatch) => {
    dispatch(createAction(TRADES_TABLE_MOBILE_FILTER, true));
    dispatch(createAction(TRADES_TABLE_MOBILE_SORT, false));
  };
};

export const mobileShowSort = () => {
  return (dispatch) => {
    dispatch(createAction(TRADES_TABLE_MOBILE_FILTER, false));
    dispatch(createAction(TRADES_TABLE_MOBILE_SORT, true));
  };
};

export const fetchTrades = (meta: Meta = new Meta(), oldTrades = [], silent = false) => {
  return (dispatch) => {

    dispatch(createAction(TRADES_TABLE_STATUS, {
      loading: !silent,
      progressing: true,
    }));

    return api.trades(meta)
      .then(response => {
        // Mode needs to be preserved (or sent back from server?)
        if (response.meta) {
          response.meta.mode = meta.mode;
        }

        const tradesHash = {};
        oldTrades.forEach(trade => {
          tradesHash[trade.id] = trade;
        });

        const newTrades = response.data || [];
        newTrades.forEach(newTrade => {
          const oldTrade = tradesHash[newTrade.id];
          if (tradesHash.hasOwnProperty(newTrade.id)) {
            ['cpp', 'gap', 'profit'].forEach(field => {
              const oldValue = oldTrade[field] || 0;
              const newValue = newTrade[field] || 0;
              if (oldValue !== newValue) {
                newTrade[field + '_diff'] = newValue - oldValue;
              } else {
                newTrade[field + '_diff'] = oldTrade[field + '_diff'] || 0;
              }
            });
          }
          newTrade.showMore = oldTrade ? oldTrade.showMore : false;
        });

        dispatch(createAction(TRADES_TABLE, response));
        dispatch(createAction(TRADES_TABLE_STATUS, Status.createSuccess()));
        dispatch(hideMessage(TRADES_TABLE_ERROR));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', TRADES_TABLE_ERROR));
        dispatch(createAction(TRADES_TABLE_STATUS, new Status()));
      });
  };
};

export const refreshTrades = () => {
  return (dispatch, getState) => {
    dispatch(fetchTrades(getState().tradesTable.meta));
  };
};

export const confirmCancelTrade = (trade: Trade, mode: string) => {
  return dispatch => {
    dispatch(createAction(TRADES_TABLE_CANCEL_STATUS, {
      loading: true,
      progressing: true,
    }));

    api.cancelOrder({ exchange_account_id: trade.exchange_account_id, trade_id: trade.id }, mode)
      .then(() => {
        dispatch(fetchTrades()).then(() => {
          dispatch(hideMessage(MSG_DELETE_ERROR));
          dispatch(createAction(TRADES_TABLE_CANCEL_STATUS, Status.createSuccess()));
          dispatch(showMessage('Order sucessfully cancelled', 'success', MSG_SUCCESS));
        });
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_CANCEL));
        dispatch(createAction(TRADES_TABLE_CANCEL_STATUS, Status.createError()));
      });
  };
};

export const openCancelOrder = (cancelledOrder) => {
  return dispatch => {
    dispatch(createAction(TRADES_TABLE_CANCELLED_ORDER, cancelledOrder));
    dispatch(createAction(TRADES_TABLE_CANCEL_STATUS, Status.createProgressing()));
  };
};

export const cancelOrder = () => {
  return (dispatch) => {
    dispatch(createAction(TRADES_TABLE_CANCEL_STATUS, new Status()));
    dispatch(createAction(TRADES_TABLE_CANCELLED_ORDER, {}));
  };
};


export const openDeleteTrade = (deletedTrade) => {
  return dispatch => {
    dispatch(createAction(TRADES_TABLE_DELETED_TRADE, deletedTrade));
    dispatch(createAction(TRADES_TABLE_DELETE_STATUS, Status.createProgressing()));
  };
};

export const confirmDeleteTrade = (tradeId: number) => {
  return dispatch => {
    dispatch(createAction(TRADES_TABLE_DELETE_STATUS, {
      loading: true,
      progressing: true,
    }));

    api.deleteTrade(tradeId)
      .then(() => {
        dispatch(fetchTrades()).then(() => {
          dispatch(hideMessage(MSG_DELETE_ERROR));
          dispatch(createAction(TRADES_TABLE_DELETE_STATUS, Status.createSuccess()));
          dispatch(showMessage('Trade sucessfully deleted', 'success', MSG_SUCCESS));
        });
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_DELETE_ERROR));
        dispatch(createAction(TRADES_TABLE_DELETE_STATUS, Status.createError()));
      });
  };
};

export const cancelDelete = () => {
  return (dispatch) => {
    dispatch(createAction(TRADES_TABLE_DELETE_STATUS, new Status()));
    dispatch(createAction(TRADES_TABLE_DELETED_TRADE, {}));
  };
};

export const mobileShowMore = (trades, trade) => {
  return (dispatch) => {
    trade.showMore = true;
    dispatch(createAction(TRADES_TABLE, { data: trades }));
  };
};

export const mobileShowLess = (trades, trade) => {
  return (dispatch) => {
    trade.showMore = false;
    dispatch(createAction(TRADES_TABLE, { data: trades }));
  };
};

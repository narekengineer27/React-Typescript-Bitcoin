import * as _ from 'lodash';
import * as api from 'Utils/api';

import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { Trade } from 'Models/Trade';
import { refreshTrades } from '../TradesTable/actions';
import { loadCurrencyRates } from '../actions';
import * as auth from 'Utils/auth';
import { openExitStrategy } from 'Components/ExitStrategy/actions';

import { hideAllMessages, hideMessage, showMessage } from 'Components/GlobalMessage/actions';
import {
  BUY_SELL_BUY,
  BUY_SELL_BUY_STATUS,
  BUY_SELL_CLOSE,
  BUY_SELL_INFO,
  BUY_SELL_INFO_STATUS,
  BUY_SELL_OPEN,
  BUY_SELL_SAVE_STRATEGY_STATUS,
  BUY_SELL_SELL_STATUS,
  BUY_SELL_STRATEGY,
  StrategyType,
} from './types';

const MSG_INFO_ERROR = {};
const MSG_BUY = {};
const MSG_SELL = {};
const MSG_SAVE_STRATEGY = {};

export const openBuy = (exchangeId: string, coinId: string) => {
  return openBuySell(exchangeId, coinId, false);
};

export const openSell = (trade: Trade) => {
  return openBuySell(trade.exchange_id, trade.target_coin_id, true, trade);
};

export const openBuySell = (exchangeId: string, coinId: string, sellMode: boolean, sellTrade?: Trade) => {
  return (dispatch) => {
    const defaultCurrency = auth.getCurrentUser().currency;

    dispatch(createAction(BUY_SELL_OPEN, {coinId, defaultCurrency, exchangeId, sellMode, sellTrade}));
    dispatch(loadCurrencyRates()).then(() => {
      dispatch(loadInfo(exchangeId, coinId, sellMode));
    });
  };
};

export const close = () => {
  return dispatch => {
    dispatch(hideAllMessages());
    dispatch(createAction(BUY_SELL_CLOSE, {}));
  };
};

const loadInfo = (exchangeId: string, coinId: string, sellMode: boolean) => {
  return dispatch => {
    dispatch(createAction(BUY_SELL_INFO_STATUS, Status.createLoading()));

    return (sellMode ? api.getHighestBid : api.getLowestAsk)(exchangeId, coinId)
      .then(response => {
        dispatch(createAction(BUY_SELL_INFO, response));
        dispatch(createAction(BUY_SELL_INFO_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_INFO_ERROR));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_INFO_ERROR));
        dispatch(createAction(BUY_SELL_INFO_STATUS, Status.createError()));
      });
  };
};

export const buy = (data, mode: string) => {
  return dispatch => {
    dispatch(createAction(BUY_SELL_BUY_STATUS, Status.createLoading()));

    api.buy(data, mode)
      .then(response => {
        dispatch(createAction(BUY_SELL_BUY_STATUS, Status.createSuccess()));
        dispatch(createAction(BUY_SELL_BUY, _.get(response, 'data.id')));
        dispatch(showMessage('You have successfully bought the coins.', 'success', MSG_BUY));
        dispatch(openExitStrategy(response.data, 'BuySell'));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_BUY));
        dispatch(createAction(BUY_SELL_BUY_STATUS, Status.createError()));
      });
  };
};

export const sell = (data, mode: string) => {
  return dispatch => {
    dispatch(createAction(BUY_SELL_SELL_STATUS, Status.createLoading()));

    api.sell(data, mode)
      .then(response => {
        dispatch(createAction(BUY_SELL_SELL_STATUS, Status.createSuccess()));
        dispatch(close());
        dispatch(showMessage('You have successfully sold the coins.', 'success', MSG_SELL));
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_SELL));
        dispatch(createAction(BUY_SELL_SELL_STATUS, Status.createError()));
      });
  };
};

export const setStrategy = (strategy: StrategyType) => {
  return dispatch => {
    dispatch(createAction(BUY_SELL_STRATEGY, strategy));
  };
};

export const saveStrategy = (trade: Trade) => {
  return dispatch => {
    dispatch(createAction(BUY_SELL_SAVE_STRATEGY_STATUS, Status.createLoading()));

    api.updateTrade(trade)
      .then(response => {
        dispatch(createAction(BUY_SELL_SAVE_STRATEGY_STATUS, Status.createSuccess()));
        dispatch(close());
        dispatch(showMessage('Your transaction has been saved.', 'success', MSG_SAVE_STRATEGY));
        dispatch(refreshTrades());
      })
      .catch(error => {
        dispatch(showMessage(error, 'error', MSG_SAVE_STRATEGY));
        dispatch(createAction(BUY_SELL_SAVE_STRATEGY_STATUS, Status.createError()));
      });
  };
};

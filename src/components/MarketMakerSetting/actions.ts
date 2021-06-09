import { createAction } from 'Models/Action';
import * as api from 'Utils/api';
import {
    TOTAL_SUMMARY_CHECK,
    MARKET_MAKER_EXCHANGE_LIST,
    MARKET_MAKER_EXCHANGE_LIST_SUCCESS,
    MARKET_MAKER_EXCHANGE_LIST_FAILED,
    MARKET_MAKER_COIN_LIST,
    MARKET_MAKER_COIN_LIST_SUCCESS,
    MARKET_MAKER_COIN_LIST_FAILED,
    MARKET_MAKER_LIST,
    MARKET_MAKER_LIST_FAILED,
    MARKET_MAKER_LIST_SUCCESS,
    SAVE_MARKET_MAKER_LIST,
    SAVE_MARKET_MAKER_LIST_SUCCESS,
    SAVE_MARKET_MAKER_LIST_FAILED,
    MARKET_MAKER_TRADE_LIST,
    MARKET_MAKER_TRADE_LIST_SUCCESS,
    MARKET_MAKER_TRADE_LIST_FAILED,
    ADD_MARKET_MAKER_TRADE,
    ADD_MARKET_MAKER_TRADE_SUCCESS,
    ADD_MARKET_MAKER_TRADE_FAILED,
    UPDATE_MARKET_MAKER_TRADE,
    UPDATE_MARKET_MAKER_TRADE_SUCCESS,
    UPDATE_MARKET_MAKER_TRADE_FAILED,
    GET_MARKET_MAKER_BALANCE,
    GET_MARKET_MAKER_BALANCE_SUCCESS,
    GET_MARKET_MAKER_BALANCE_FAILED,
    START_LOOP,
    START_LOOP_SUCCESS,
    START_LOOP_FAILED
} from './types';

export const checkTotalSummary = () => {
  return (dispatch) => {
    dispatch(createAction(TOTAL_SUMMARY_CHECK, true));
  };
};

export const uncheckTotalSummary = () => {
    return (dispatch) => {
      dispatch(createAction(TOTAL_SUMMARY_CHECK, false));
    };
};

export const getExchangeList = () => {
    return (dispatch) => {
      dispatch(createAction(MARKET_MAKER_EXCHANGE_LIST, {}));
      api.marketmakerexchanges()
        .then(response => {
          dispatch(createAction(MARKET_MAKER_EXCHANGE_LIST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(MARKET_MAKER_EXCHANGE_LIST_FAILED, err));
        });
    };
};

export const getCoinList = (exchange: string) => {
    return (dispatch) => {
        dispatch(createAction(MARKET_MAKER_COIN_LIST, {}));
        api.marketMakerExchangeCoinList(exchange)
          .then(response => {
            dispatch(createAction(MARKET_MAKER_COIN_LIST_SUCCESS, response));
          })
          .catch(err => {
            dispatch(createAction(MARKET_MAKER_COIN_LIST_FAILED, err));
          });
    }
}

export const getMarketMakerList = () => {
  return (dispatch) => {
      dispatch(createAction(MARKET_MAKER_LIST, {}));
      api.marketmakerMarketMakerList()
        .then(response => {
          dispatch(createAction(MARKET_MAKER_LIST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(MARKET_MAKER_LIST_FAILED, err));
        });
  }
}

export const addMarketMaker = (data: any) => {
  return (dispatch) => {
      dispatch(createAction(SAVE_MARKET_MAKER_LIST, {}));
      api.addMarketMaker(data)
        .then(response => {
          dispatch(createAction(SAVE_MARKET_MAKER_LIST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(SAVE_MARKET_MAKER_LIST_FAILED, err));
        });
  }
}

export const getMarketMakerTradeList = (id: string) => {
  return (dispatch) => {
      dispatch(createAction(MARKET_MAKER_TRADE_LIST, {}));
      api.marketmakerTradeList(id)
        .then(response => {
          dispatch(createAction(MARKET_MAKER_TRADE_LIST_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(MARKET_MAKER_TRADE_LIST_FAILED, err));
        });
  }
}

export const addMarketMakerTrade = (data: any) => {
  return (dispatch) => {
      dispatch(createAction(ADD_MARKET_MAKER_TRADE, {}));
      api.addMarketMakerTradeSetting(data)
        .then(response => {
          dispatch(createAction(ADD_MARKET_MAKER_TRADE_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(ADD_MARKET_MAKER_TRADE_FAILED, err));
        });
  }
}

export const updateMarketMakerTrade = (id: string, data: any) => {
  return (dispatch) => {
      dispatch(createAction(UPDATE_MARKET_MAKER_TRADE, {}));
      api.updateMarketMakerTradeSetting(id, data)
        .then(response => {
          dispatch(createAction(UPDATE_MARKET_MAKER_TRADE_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(UPDATE_MARKET_MAKER_TRADE_FAILED, err));
        });
  }
}

export const getMarketMakerBalance = (data: any) => {
  return (dispatch) => {
      dispatch(createAction(GET_MARKET_MAKER_BALANCE, {}));
      api.getMarketMakerBalance(data)
        .then(response => {
          dispatch(createAction(GET_MARKET_MAKER_BALANCE_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(GET_MARKET_MAKER_BALANCE_FAILED, err));
        });
  }
}

export const startLoop = (id: string, data: any) => {
  return (dispatch) => {
      dispatch(createAction(START_LOOP, {}));
      api.startLoop(id, data)
        .then(response => {
          dispatch(createAction(START_LOOP_SUCCESS, response));
        })
        .catch(err => {
          dispatch(createAction(START_LOOP_FAILED, err));
        });
  }
}
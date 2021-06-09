
import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
    SINGLE_TRADES_REQUEST,
    SINGLE_TRADES_REQUEST_FAILURE,
    SINGLE_TRADES_REQUEST_SUCCESS,
    MULTI_TRADES_REQUEST,
    MULTI_TRADES_REQUEST_FAILURE,
    MULTI_TRADES_REQUEST_SUCCESS,
    SELL_ORDER_REQUEST,
    SELL_ORDER_REQUEST_FAILURE,
    SELL_ORDER_REQUEST_SUCCESS,
    BUY_ORDER_REQUEST,
    BUY_ORDER_REQUEST_FAILURE,
    BUY_ORDER_REQUEST_SUCCESS
} from './types';

export const getSingleTrades = (id) => {
    return (dispatch) => {
      dispatch(createAction(SINGLE_TRADES_REQUEST, {}));
      api.singleTrades(id)
          .then(response => {
              dispatch(createAction(SINGLE_TRADES_REQUEST_SUCCESS, response));
          })
          .catch(err => {
              dispatch(createAction(SINGLE_TRADES_REQUEST_FAILURE, err));
          });
    };
};

export const getMultiTrades = (ids) => {
    return (dispatch) => {
      dispatch(createAction(MULTI_TRADES_REQUEST, {}));
      api.multiTrades(ids)
          .then(response => {
              dispatch(createAction(MULTI_TRADES_REQUEST_SUCCESS, response));
          })
          .catch(err => {
              dispatch(createAction(MULTI_TRADES_REQUEST_FAILURE, err));
          });
    };
};

export const sellOrder = (id) => {
    var data = {
        id: id
    };
    return (dispatch) => {
        dispatch(createAction(SELL_ORDER_REQUEST, {}));
        api.sellOrder(data)
            .then(response => {
                dispatch(createAction(SELL_ORDER_REQUEST_SUCCESS, response));
            })
            .catch(err => {
                dispatch(createAction(SELL_ORDER_REQUEST_FAILURE, err));
            })
    }
};

export const buyOrder = (id) => {
    var data = {
        id: id
    };
    return (dispatch) => {
        dispatch(createAction(BUY_ORDER_REQUEST, {}));
        api.buyOrder(data)
            .then(response => {
                dispatch(createAction(BUY_ORDER_REQUEST_SUCCESS, response));
            })
            .catch(err => {
                dispatch(createAction(BUY_ORDER_REQUEST_FAILURE, err));
            })
    }
};
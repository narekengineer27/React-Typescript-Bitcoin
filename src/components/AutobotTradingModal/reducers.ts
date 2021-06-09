import { Status } from 'Models/Status';
import {
    SINGLE_TRADES_REQUEST,
    SINGLE_TRADES_REQUEST_FAILURE,
    SINGLE_TRADES_REQUEST_SUCCESS,
    MULTI_TRADES_REQUEST,
    MULTI_TRADES_REQUEST_FAILURE,
    MULTI_TRADES_REQUEST_SUCCESS
} from './types';

export default (state, action) => {
  switch (action.type) {
    case SINGLE_TRADES_REQUEST:
    case MULTI_TRADES_REQUEST:
      return {
        ...state,
        singleTrades: {
            ...state.singleTrades,
            status: { loading: true },
        }
      };
    case SINGLE_TRADES_REQUEST_SUCCESS:
    case MULTI_TRADES_REQUEST_SUCCESS:
      return {
        ...state,
        singleTrades: {
            data: action.payload.data,
            status: { loading: false, success: true },
        }
      };
    case SINGLE_TRADES_REQUEST_FAILURE:
    case MULTI_TRADES_REQUEST_FAILURE:
      return {
        ...state,
        singleTrades: {
            ...state.singleTrades,
            status: { loading: false, error: true },
        }
      };
    default:
      return {
        ...state,
      };
  }
};

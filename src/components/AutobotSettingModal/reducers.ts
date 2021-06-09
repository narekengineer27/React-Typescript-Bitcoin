import { Status } from 'Models/Status';
import {
    AUTOBOT_SETTING_REQUEST,
    AUTOBOT_SETTING_REQUEST_FAILURE,
    AUTOBOT_SETTING_REQUEST_SUCCESS,
    EXCHANGE_BALANCE_REQUEST,
    EXCHANGE_BALANCE_REQUEST_FAILURE,
    EXCHANGE_BALANCE_REQUEST_SUCCESS,
    AUTOBOT_TOKEN_BALANCE_REQUEST,
    AUTOBOT_TOKEN_BALANCE_REQUEST_FAILURE,
    AUTOBOT_TOKEN_BALANCE_REQUEST_SUCCESS,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS
} from './types';

export default (state, action) => {
  switch (action.type) {
    case AUTOBOT_TOKEN_BALANCE_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
        }
      };
    case AUTOBOT_TOKEN_BALANCE_REQUEST_SUCCESS:
      return {
        ...state,
        token: action.payload.data,
        status: { loading: false, success: true },
      };
    case AUTOBOT_TOKEN_BALANCE_REQUEST_FAILURE:
      return {
        ...state,
        token: action.payload.data,
        status: { loading: false, error: true },
      };
    case EXCHANGE_BALANCE_REQUEST:
      return {
        ...state,
        status: {
          loading: true,
        }
      };
    case EXCHANGE_BALANCE_REQUEST_SUCCESS:
      return {
        ...state,
        exchangeAccounts: {
            data: action.payload.data,
            status: { loading: false, success: true },
        },
      };
    case EXCHANGE_BALANCE_REQUEST_FAILURE:
      return {
        ...state,
        exchangeAccounts: {
            data: action.payload.data,
            status: { loading: false, error: true },
        },
      };
    case ACTIVATE_EXCHANGE_ACCOUNT_REQUEST:
        return {
            ...state,
            exchangeAccounts: {
              ...state.exchangeAccounts,
                status: {
                    loading: true
                }
            }
        }
    case ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS:
        var exchangeAccounts = state.exchangeAccounts.data.exchangeDetails;
        var incomingAccounts = action.payload.data.exchanges;

        exchangeAccounts.map((m, index) => {
            incomingAccounts.map((n, index2) => {
              if(m.id == n.id) {
                exchangeAccounts[index] = n;
              }
            })
        })

        var data = {
          exchangeDetails: exchangeAccounts
        }
        return {
            ...state,
            exchangeAccounts: {
                data: data,
                status: {
                    loading: false, success: true
                }
            }
        }
    case ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE:
        return {
            ...state,
            exchangeAccounts: {
                ...state.exchangeAccounts,
                status: {
                    loading: false, error: true
                }
            }
        }
    default:
      return {
        ...state,
      };
  }
};

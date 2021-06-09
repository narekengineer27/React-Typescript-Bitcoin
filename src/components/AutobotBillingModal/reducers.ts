import { User } from 'Models/User';
import { Status } from 'Models/Status';
import { 
    FILTERED_XRR_PRICE_REQUEST,
    FILTERED_XRR_PRICE_REQUEST_FAILURE,
    FILTERED_XRR_PRICE_REQUEST_SUCCESS,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE,
    ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS
 } from './types';

export default (state, action) => {
  switch (action.type) {
    case FILTERED_XRR_PRICE_REQUEST:
      return {
          ...state,
          xrrPrice: {
            ...state.xrrPrice,
              status: {
                  loading: true
              }
            }
      }
    case FILTERED_XRR_PRICE_REQUEST_SUCCESS:
        return {
            ...state,
            xrrPrice: {
                data: action.payload.data,
                status: {
                    loading: false, success: true
                }
            }
        }
    case FILTERED_XRR_PRICE_REQUEST_FAILURE:
        return {
            ...state,
            xrrPrice: {
                ...state.xrrPrice,
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

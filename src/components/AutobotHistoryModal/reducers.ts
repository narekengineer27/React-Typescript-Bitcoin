import { User } from 'Models/User';
import { Status } from 'Models/Status';
import { 
    FILTERED_HISTORY_REQUEST,
    FILTERED_HISTORY_REQUEST_FAILURE,
    FILTERED_HISTORY_REQUEST_SUCCESS
 } from './types';

export default (state, action) => {
  switch (action.type) {
    case FILTERED_HISTORY_REQUEST:
      return {
          ...state,
          historyData: {
            ...state.historyData,
              status: {
                  loading: true
              }
            }
      }
    case FILTERED_HISTORY_REQUEST_SUCCESS:
        return {
            ...state,
            historyData: {
                filteredHistory: action.payload.data,
                status: {
                    loading: false, success: true
                }
            }
        }
    case FILTERED_HISTORY_REQUEST_FAILURE:
        return {
            ...state,
            historyData: {
                ...state.historyData,
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

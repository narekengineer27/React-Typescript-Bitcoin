
import { 
    ROLE_FETCH,
    ROLE_FETCH_SUCCESS,
    ROLE_FETCH_FAILURE,
 } from './types';

export default (state, action) => {
  switch (action.type) {
    case ROLE_FETCH:
        return {
            ...state,
            rolelist:[],
            status: {
                loading: true
            }
        }
    case ROLE_FETCH_SUCCESS:
        return {
            ...state,
            rolelist: action.payload.data,
            status: {
                loading: false, success: true
            }
        }
    case ROLE_FETCH_FAILURE:
        return {
            ...state,
            rolelist:[],
            status: {
                loading: false, error: true
            }
        }
    default:
        return {
            ...state,
        };
  }
};

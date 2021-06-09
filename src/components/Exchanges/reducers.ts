import { Status } from 'Models/Status';
import {
    EXCHANGES_OFFERS,
    EXCHANGES_OFFERS_FAILURE,
    EXCHANGES_OFFERS_SUCCESS,
    IState
} from './types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case EXCHANGES_OFFERS:
      return {
        ...state,
        status: {
          loading: true,
        }
      };
    case EXCHANGES_OFFERS_SUCCESS:
      return {
        ...state,
        exchangesOffers: action.payload,
        status: { loading: false, success: true },
      };
    case EXCHANGES_OFFERS_FAILURE:
      return {
        ...state,
        status: { loading: false, error: true },
      };
    default:
      return {
        ...state,
      };
  }
};

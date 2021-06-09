import { Status } from 'Models/Status';
import {
    MARKET_MAKER_OFFERS,
    MARKET_MAKER_OFFERS_FAILURE,
    MARKET_MAKER_OFFERS_SUCCESS,
    IState
} from './types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case MARKET_MAKER_OFFERS:
      return {
        ...state,
        status: {
          loading: true,
        }
      };
    case MARKET_MAKER_OFFERS_SUCCESS:
      return {
        ...state,
        marketMakerOffers: action.payload,
        status: { loading: false, success: true },
      };
    case MARKET_MAKER_OFFERS_FAILURE:
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

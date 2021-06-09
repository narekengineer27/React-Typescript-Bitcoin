import { Status } from 'Models/Status';
import {
    TOKEN_OWNERS_OFFERS,
    TOKEN_OWNERS_OFFERS_FAILURE,
    TOKEN_OWNERS_OFFERS_SUCCESS,
    IState
} from './types';

const initialState: IState = {
  status: new Status(),
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case TOKEN_OWNERS_OFFERS:
      return {
        ...state,
        status: {
          loading: true,
        }
      };
    case TOKEN_OWNERS_OFFERS_SUCCESS:
      return {
        ...state,
        tokenOwnersOffers: action.payload,
        status: { loading: false, success: true },
      };
    case TOKEN_OWNERS_OFFERS_FAILURE:
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

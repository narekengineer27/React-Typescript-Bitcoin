import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { SetupDetails } from 'Models/SetupDetails';
import {
  MARKET_MAKER_OFFERS,
  MARKET_MAKER_OFFERS_FAILURE,
  MARKET_MAKER_OFFERS_SUCCESS
} from './types';

export const getOffers = () => {
  return (dispatch) => {
    dispatch(createAction(MARKET_MAKER_OFFERS, {}));
    api.getAllOffer("1")
      .then(response => {
        dispatch(createAction(MARKET_MAKER_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(MARKET_MAKER_OFFERS_FAILURE, err));
      });
  };
};


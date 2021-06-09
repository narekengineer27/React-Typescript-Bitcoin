import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { SetupDetails } from 'Models/SetupDetails';
import {
  EXCHANGES_OFFERS,
  EXCHANGES_OFFERS_FAILURE,
  EXCHANGES_OFFERS_SUCCESS
} from './types';

export const getOffers = () => {
  return (dispatch) => {
    dispatch(createAction(EXCHANGES_OFFERS, {}));
    api.getAllOffer("3")
      .then(response => {
        dispatch(createAction(EXCHANGES_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(EXCHANGES_OFFERS_FAILURE, err));
      });
  };
};


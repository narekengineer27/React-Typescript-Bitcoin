import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
  TOKEN_OWNERS_OFFERS,
  TOKEN_OWNERS_OFFERS_FAILURE,
  TOKEN_OWNERS_OFFERS_SUCCESS
} from './types';

export const getOffers = () => {
  return (dispatch) => {
    dispatch(createAction(TOKEN_OWNERS_OFFERS, {}));
    api.getAllOffer("2")
      .then(response => {
        dispatch(createAction(TOKEN_OWNERS_OFFERS_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(TOKEN_OWNERS_OFFERS_FAILURE, err));
      });
  };
};


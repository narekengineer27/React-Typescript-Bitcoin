import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
  FILTERED_XRR_PRICE_REQUEST,
  FILTERED_XRR_PRICE_REQUEST_FAILURE,
  FILTERED_XRR_PRICE_REQUEST_SUCCESS,
  // ACTIVATE_EXCHANGE_ACCOUNT_REQUEST,
  // ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE,
  // ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS
} from './types';

export const fetchXrrPrice = () => {
  return (dispatch) => {
    dispatch(createAction(FILTERED_XRR_PRICE_REQUEST, {}));
    api.getXrrPrice()
      .then(response => {
        dispatch(createAction(FILTERED_XRR_PRICE_REQUEST_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(FILTERED_XRR_PRICE_REQUEST_FAILURE, err));
      });
  };
};


// export const activateAutobotAccount = (data) => {
//   return (dispatch) => {
//     dispatch(createAction(ACTIVATE_EXCHANGE_ACCOUNT_REQUEST, {}));
//     api.activateAutobotAccount(data)
//       .then(response => {
//         dispatch(createAction(ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_SUCCESS, response));
//       })
//       .catch(err => {
//         dispatch(createAction(ACTIVATE_EXCHANGE_ACCOUNT_REQUEST_FAILURE, err));
//       });
//   };
// };

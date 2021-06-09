import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
  FILTERED_HISTORY_REQUEST,
  FILTERED_HISTORY_REQUEST_FAILURE,
  FILTERED_HISTORY_REQUEST_SUCCESS
} from './types';

export const fetchFilteredHistory = (filter) => {
  return (dispatch) => {
    dispatch(createAction(FILTERED_HISTORY_REQUEST, {}));
    api.getFilteredHistory(filter)
      .then(response => {
        dispatch(createAction(FILTERED_HISTORY_REQUEST_SUCCESS, response));
      })
      .catch(err => {
        dispatch(createAction(FILTERED_HISTORY_REQUEST_FAILURE, err));
      });
  };
};


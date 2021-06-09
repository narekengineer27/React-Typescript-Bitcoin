import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
  VERIFY_EMAIL_VERIFY,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILURE
} from './types';
import { showMessage } from 'Components/GlobalMessage/actions';

const MSG_SIGNUP_ERROR = {};

export const verify = (emailToken: string) => {
  return (dispatch) => {
    dispatch(createAction(VERIFY_EMAIL_VERIFY, {}));
    api.verifyEmail(emailToken)
      .then(response => {
        dispatch(createAction(VERIFY_EMAIL_SUCCESS, {}));
      })
      .catch(err => {
        dispatch(createAction(VERIFY_EMAIL_FAILURE, {}));
        dispatch(showMessage(err, 'error', MSG_SIGNUP_ERROR));
      });

  };
};

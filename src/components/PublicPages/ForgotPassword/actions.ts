import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import {
  FORGOT_PASSWORD_RESET
} from './types';
import { Status } from 'Models/Status';
import { hideMessage, showMessage } from 'Components/GlobalMessage/actions';
import { login } from 'Components/PublicPages/Login/actions';
import { history } from 'Components/Routes';

const MSG_RESET = {};

export const resetPassword = (emailToken: string, password: string) => {
  return (dispatch) => {
    dispatch(createAction(FORGOT_PASSWORD_RESET, Status.createLoading()));
    api.resetPassword(emailToken, password)
      .then(response => {
        dispatch(createAction(FORGOT_PASSWORD_RESET, Status.createSuccess()));
        dispatch(showMessage('Password has been reset, and you will be logged-in shortly.', 'success', MSG_RESET));
        setTimeout(
          () => {
            dispatch(hideMessage(MSG_RESET));
            dispatch(login({ email: response.data.email, password }))
              .then(() => {
                history.push('/mtr');
              })
              .catch(err => {
                dispatch(showMessage(
                  'There was an error logging you in, please retry from the Login page.', 'error', MSG_RESET));
              });
          },
          2000);
      })
      .catch(err => {
        dispatch(createAction(FORGOT_PASSWORD_RESET, Status.createError()));
        dispatch(showMessage(
          'Could not reset the password - the reset link has expired or was already used.', 'error', MSG_RESET));
      });

  };
};

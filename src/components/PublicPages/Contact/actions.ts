import { reset } from 'redux-form';
import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';
import { ContactMessage } from 'Models/ContactMessage';

import {
  CONTACT_STATUS,
} from './types';

import { showMessage } from 'Components/GlobalMessage/actions';

const MSG_CONTACT = {};

export const sendContact = (message: ContactMessage) => {
  return (dispatch) => {
    dispatch(createAction(CONTACT_STATUS, Status.createLoading()));
    api.contactUs(message)
      .then(response => {
        dispatch(reset('contact'));
        dispatch(createAction(CONTACT_STATUS, Status.createSuccess()));
        dispatch(showMessage('Your message was sent.', 'success', MSG_CONTACT));
      })
      .catch(error => {
        dispatch(createAction(CONTACT_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_CONTACT));
      });
  };
};

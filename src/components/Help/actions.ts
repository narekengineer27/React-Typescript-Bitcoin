import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import { Status } from 'Models/Status';

import {
  HELP_ARTICLES,
  HELP_ARTICLES_STATUS,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';

const MSG_HELP = {};

export const loadHelp = (search: string = '') => {
  return (dispatch) => {
    dispatch(createAction(HELP_ARTICLES_STATUS, Status.createLoading()));
    api.help(search)
      .then(response => {
        dispatch(createAction(HELP_ARTICLES, response.data));
        dispatch(createAction(HELP_ARTICLES_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_HELP));
      })
      .catch(error => {
        dispatch(createAction(HELP_ARTICLES_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_HELP));
      });
  };
};

import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  QUESTIONNAIRE_STATUS,
  QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_ERROR = {};

export const saveSettings = () => {
  return (dispatch) => {
    dispatch(createAction(QUESTIONNAIRE_STATUS, Status.createLoading()));
    return api.saveQuestionnaire()
      .then(response => {
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(QUESTIONNAIRE_STATUS, Status.createSuccess()));
        dispatch(showMessage('Questions saved successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(QUESTIONNAIRE_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const addNewQuestion = () => {
  return (dispatch) => {
    dispatch(createAction(QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS, Status.createProgressing()));
  };
};

export const cancelAddQuestion = () => {
  return (dispatch) => {
    dispatch(createAction(QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS, new Status()));
  };
};

export const confirmAddQuestion = () => {
  return (dispatch) => {
    dispatch(createAction(QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS, {
      loading: true,
      progressing: true,
    }));
    setTimeout(() => {
      dispatch(createAction(QUESTIONNAIRE_ADD_NEW_QUESTION_STATUS, new Status()));
    }, 1000);
  };
};

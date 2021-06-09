import * as api from 'Utils/api';
import * as _ from 'lodash';
import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
import {
  BLOG_FORM_ADD_STATUS,
  BLOG_FORM_ADD_SAVE,
  BLOG_FORM_ADD_SUCCESS,
  BLOG_FORM_EDIT_STATUS,
  BLOG_FORM_EDIT_RECORD,
} from './types';

const MSG_SAVE_ERROR = {};
const MSG_SAVE_SUCCESS = {};
const MSG_ERROR = {};

export const saveRecord = (record, type) => {
  return (dispatch) => {
    record.image = _.get(record, 'image.0', '');
    dispatch(createAction(BLOG_FORM_ADD_SAVE, record));
    api.addRichDataRecord(record, type)
      .then(response => {
        dispatch(createAction(BLOG_FORM_ADD_SUCCESS, null));
        dispatch(hideMessage(MSG_SAVE_ERROR));
        dispatch(showMessage('You have saved the record successfully!', 'success', MSG_SAVE_SUCCESS ))
      })
      .catch(error => {
        dispatch(createAction(BLOG_FORM_ADD_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_SAVE_ERROR));
      });
  };
};

export const loadRecord = (id: number) => {
  return (dispatch) => {
    dispatch(createAction(BLOG_FORM_EDIT_STATUS, Status.createLoading()));
    api.getRichDataRecord(id, 'blog')
      .then(response => {
        dispatch(createAction(BLOG_FORM_EDIT_RECORD, response.data));
        dispatch(createAction(BLOG_FORM_EDIT_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(BLOG_FORM_EDIT_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const updateRecord = (id, record, type) => {
  return (dispatch) => {
    dispatch(createAction(BLOG_FORM_EDIT_STATUS, Status.createLoading()));
    api.updateRecord(id, record, type)
      .then(response => {
        dispatch(createAction(BLOG_FORM_EDIT_RECORD, response.data));
        dispatch(hideMessage(MSG_SAVE_ERROR));
        dispatch(showMessage('You have updated the record successfully!', 'success', MSG_SAVE_SUCCESS ))
        dispatch(createAction(BLOG_FORM_EDIT_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(createAction(BLOG_FORM_EDIT_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_SAVE_ERROR));
      });
  };
};

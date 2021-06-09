import * as api from 'Utils/api';
import { createAction } from 'Models/Action';
import * as _ from 'lodash';
import { Status } from 'Models/Status';
import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
import {
  FAQ_FORM_ADD_STATUS,
  FAQ_FORM_ADD_SAVE,
  FAQ_FORM_ADD_SUCCESS,
  FAQ_FORM_EDIT_STATUS,
  FAQ_FORM_EDIT_RECORD,
} from './types';

const MSG_SAVE_ERROR = {};
const MSG_SAVE_SUCCESS = {};
const MSG_ERROR = {};

export const saveRecord = (record, type) => {
  return (dispatch) => {
    record.image = _.get(record, 'image.0', '');
    dispatch(createAction(FAQ_FORM_ADD_SAVE, record));
    api.addRichDataRecord(record, type)
      .then(response => {
        dispatch(createAction(FAQ_FORM_ADD_SUCCESS, null));
        dispatch(hideMessage(MSG_SAVE_ERROR));
        dispatch(showMessage('You have saved the record successfully!', 'success', MSG_SAVE_SUCCESS ))
      })
      .catch(error => {
        dispatch(createAction(FAQ_FORM_ADD_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_SAVE_ERROR));
      });
  };
};

export const loadRecord = (id: number) => {
  return (dispatch) => {
    dispatch(createAction(FAQ_FORM_EDIT_STATUS, Status.createLoading()));
    api.getRichDataRecord(id, 'faq')
      .then(response => {
        dispatch(createAction(FAQ_FORM_EDIT_RECORD, response.data));
        dispatch(createAction(FAQ_FORM_EDIT_STATUS, Status.createSuccess()));
        dispatch(hideMessage(MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(FAQ_FORM_EDIT_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

export const updateRecord = (id, record, type) => {
  return (dispatch) => {
    dispatch(createAction(FAQ_FORM_EDIT_STATUS, Status.createLoading()));
    api.updateRecord(id, record, type)
      .then(response => {
        dispatch(createAction(FAQ_FORM_EDIT_RECORD, response.data));
        dispatch(hideMessage(MSG_SAVE_ERROR));
        dispatch(showMessage('You have updated the record successfully!', 'success', MSG_SAVE_SUCCESS ))
        dispatch(createAction(FAQ_FORM_EDIT_STATUS, Status.createSuccess()));
      })
      .catch(error => {
        dispatch(createAction(FAQ_FORM_EDIT_STATUS, { loading: false }));
        dispatch(showMessage(error, 'error', MSG_SAVE_ERROR));
      });
  };
};

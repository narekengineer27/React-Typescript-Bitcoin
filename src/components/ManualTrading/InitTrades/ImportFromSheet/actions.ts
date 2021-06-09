import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  IMPORT_FROM_SHEET_STATUS,
} from './types';
import { showMessage, hideAllMessages } from 'Components/GlobalMessage/actions';
const MSG_UPLOAD_SUCCESS = {};

export const importFromSheet = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_FROM_SHEET_STATUS, Status.createProgressing()));
  };
};

export const cancelImport = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_FROM_SHEET_STATUS, new Status()));
  };
};

export const upload = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(IMPORT_FROM_SHEET_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(IMPORT_FROM_SHEET_STATUS, new Status()));
      dispatch(showMessage('You have uploaded the file successfully!', 'success', MSG_UPLOAD_SUCCESS));
    }, 1000);
  };
};

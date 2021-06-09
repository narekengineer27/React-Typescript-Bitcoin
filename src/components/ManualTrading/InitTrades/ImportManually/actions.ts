import { Status } from 'Models/Status';
import { createAction } from 'Models/Action';
import {
  IMPORT_MANUALLY_STATUS,
} from './types';
import { showMessage, hideAllMessages } from 'Components/GlobalMessage/actions';
const MSG_IMPORT_SUCCESS = {};

export const importManually = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_MANUALLY_STATUS, Status.createProgressing()));
  };
};


export const cancelImport = () => {
  return (dispatch) => {
    dispatch(createAction(IMPORT_MANUALLY_STATUS, new Status()));
  };
};

export const importTradesManually = () => {
  return (dispatch) => {
    dispatch(hideAllMessages());
    dispatch(createAction(IMPORT_MANUALLY_STATUS, {
      progressing: true,
      loading: true,
    }));
    setTimeout(() => {
      dispatch(createAction(IMPORT_MANUALLY_STATUS, new Status()));
      dispatch(showMessage('You have imported successfully!', 'success', MSG_IMPORT_SUCCESS));
    }, 1000);
  };
};

import * as api from 'Utils/api';
import { Status } from 'Models/Status';
import { RobotSettings } from 'Models/RobotSettings';
import { createAction } from 'Models/Action';
import {
  ROBOT_SETTINGS_INFORMATION_STATUS,
  ROBOT_SETTINGS_INFORMATION_SAVE,
  ROBOT_SETTINGS_INFORMATION_SAVE_SUCCESS,
} from './types';

import { showMessage, hideMessage } from 'Components/GlobalMessage/actions';
const MSG_ERROR = {};

export const saveSettings = (exchangeAccountId, robotSettings: RobotSettings) => {
  return (dispatch) => {
    robotSettings.auto_global_strategy = robotSettings.smart_settings ? 'simple' : 'advanced';
    dispatch(createAction(ROBOT_SETTINGS_INFORMATION_STATUS, Status.createLoading()));
    dispatch(createAction(ROBOT_SETTINGS_INFORMATION_SAVE, robotSettings));
    return api.saveRobotSettings(exchangeAccountId, robotSettings)
      .then(response => {
        dispatch(createAction(ROBOT_SETTINGS_INFORMATION_SAVE_SUCCESS, null));
        dispatch(hideMessage(MSG_ERROR));
        dispatch(createAction(ROBOT_SETTINGS_INFORMATION_STATUS, Status.createSuccess()));
        dispatch(showMessage('Robot Settings updated successfully.', 'success', MSG_ERROR));
      })
      .catch(error => {
        dispatch(createAction(ROBOT_SETTINGS_INFORMATION_STATUS, Status.createError()));
        dispatch(showMessage(error, 'error', MSG_ERROR));
      });
  };
};

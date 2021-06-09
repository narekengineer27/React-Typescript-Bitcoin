import { Status } from 'Models/Status';
import {
  ROBOT_SETTINGS_INFORMATION_STATUS,
  ROBOT_SETTINGS_INFORMATION_GET,
  RobotSettingsTabs,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  defaultRobotSettings: {},
  tab: RobotSettingsTabs.Entry,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case ROBOT_SETTINGS_INFORMATION_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ROBOT_SETTINGS_INFORMATION_GET:
      return {
        ...state,
        defaultRobotSettings: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

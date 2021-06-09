import { Status } from 'Models/Status';

export const ROBOT_SETTINGS_INFORMATION_SAVE = 'ROBOT_SETTINGS_INFORMATION_SAVE';
export const ROBOT_SETTINGS_INFORMATION_GET = 'ROBOT_SETTINGS_INFORMATION_GET';
export const ROBOT_SETTINGS_INFORMATION_SAVE_SUCCESS = 'ROBOT_SETTINGS_INFORMATION_SAVE_SUCCESS';
export const ROBOT_SETTINGS_INFORMATION_STATUS = 'ROBOT_SETTINGS_INFORMATION_STATUS';

export enum RobotSettingsTabs {
  Entry = 'entry',
  Exit = 'exit',
}

export type IState = {
  status: Status,
  defaultRobotSettings: object,
  tab: RobotSettingsTabs,
};

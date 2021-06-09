import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';

export const EXECUTION_ACTIVITY_STATUS = 'EXECUTION_ACTIVITY_STATUS';
export const EXECUTION_ACTIVITY_STATUS_LOADING = 'EXECUTION_ACTIVITY_STATUS_LOADING';
export const EXECUTION_ACTIVITY_TRADES = 'EXECUTION_ACTIVITY_TRADES';
export const EXECUTION_ACTIVITY_PROFIT = 'EXECUTION_ACTIVITY_PROFIT';
export const EXECUTION_ACTIVITY_LAST_SYNC_TIME = 'EXECUTION_ACTIVITY_LAST_SYNC_TIME';
export const EXECUTION_CYCLES_STATUS = 'EXECUTION_CYCLES_STATUS';
export const EXECUTION_CYCLES_DATA = 'EXECUTION_CYCLES_DATA';
export const EXECUTION_CYCLES_ROBOT_ACTIVE = 'EXECUTION_CYCLES_ROBOT_ACTIVE';
export const EXECUTION_CYCLES_ROBOT_STATUS = 'EXECUTION_CYCLES_ROBOT_STATUS';
export const EXECUTION_CYCLES_LAST_SYNC_TIME = 'EXECUTION_CYCLES_LAST_SYNC_TIME';
export const EXECUTION_STOP_STATUS = 'EXECUTION_STOP_STATUS';
export const EXECUTION_CONFIGURATION_STATUS = 'EXECUTION_CONFIGURATION_STATUS';
export const EXECUTION_CONFIGURATION_DATA = 'EXECUTION_CONFIGURATION_DATA';
export const EXECUTION_SHARE_STATUS = 'EXECUTION_SHARE_STATUS';
export const EXECUTION_CLEAR = 'EXECUTION_CLEAR';

export type IState = {
  activity: {
    trades: object[],
    status: Status,
    totalProfit: number,
    totalProfitInBtc: number,
    meta: Meta,
    lastSyncTime: number,
  },
  stop: {
    status: Status,
  }
  cycles: {
    data: object,
    status: Status,
    lastSyncTime: number,
  },
  robot: {
    active: boolean,
    status: Status,
  },
  configuration: {
    data: object,
    status: Status,
  },
  share: {
    status: Status,
  },
};

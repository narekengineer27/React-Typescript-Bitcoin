import { Status } from 'Models/Status';
import { Meta } from 'Models/Meta';
import { now } from 'Utils/moment';
import {
  EXECUTION_ACTIVITY_STATUS,
  EXECUTION_ACTIVITY_STATUS_LOADING,
  EXECUTION_ACTIVITY_TRADES,
  EXECUTION_ACTIVITY_PROFIT,
  EXECUTION_ACTIVITY_LAST_SYNC_TIME,
  EXECUTION_CYCLES_STATUS,
  EXECUTION_CYCLES_DATA,
  EXECUTION_CYCLES_ROBOT_ACTIVE,
  EXECUTION_CYCLES_ROBOT_STATUS,
  EXECUTION_CYCLES_LAST_SYNC_TIME,
  EXECUTION_STOP_STATUS,
  EXECUTION_CONFIGURATION_STATUS,
  EXECUTION_CONFIGURATION_DATA,
  EXECUTION_SHARE_STATUS,
  EXECUTION_CLEAR,
  IState,
} from './types';

const initialState: IState = {
  activity: {
    trades: [],
    status: new Status(),
    totalProfit: 0,
    totalProfitInBtc: 0,
    meta: new Meta(),
    lastSyncTime: now(),
  },
  stop: {
    status: new Status(),
  },
  cycles: {
    data: {
      "progress": 0, // percentage 0 - 100
      "cycle_count": 0,
      "current_cycle": 0, // 0-based index of cycle
      "minimum_fr_count": 0,
      "price_volume_count": 0,
      "ati_count": 0,
      "limiters_count": 0,
      "hold_time": 0,
    },
    status: new Status(),
    lastSyncTime: now(),
  },
  robot: {
    active: false,
    status: new Status(),
  },
  configuration: {
    data: {},
    status: new Status(),
  },
  share: {
    status: new Status(),
  }
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case EXECUTION_ACTIVITY_LAST_SYNC_TIME:
      return {
        ...state,
        activity: {
          ...state.activity,
          lastSyncTime: now(),
        },
      };
    case EXECUTION_ACTIVITY_STATUS:
      return {
        ...state,
        activity: {
          ...state.activity,
          status: action.payload,
        },
      };
    case EXECUTION_ACTIVITY_STATUS_LOADING:
      return {
        ...state,
        activity: {
          ...state.activity,
          status: {
            ...state.activity.status,
            loading: action.payload,
          },
        },
      };
    case EXECUTION_ACTIVITY_TRADES:
      return {
        ...state,
        activity: {
          ...state.activity,
          trades: action.payload,
        },
      };
    case EXECUTION_ACTIVITY_PROFIT:
      return {
        ...state,
        activity: {
          ...state.activity,
          ...action.payload,
        },
      };
    case EXECUTION_STOP_STATUS:
      return {
        ...state,
        stop: {
          ...state.stop,
          status: action.payload,
        },
      };
    case EXECUTION_CYCLES_DATA:
      return {
        ...state,
        cycles: {
          ...state.cycles,
          data: action.payload,
          status: Status.createSuccess(),
        },
      };
    case EXECUTION_CYCLES_STATUS:
      return {
        ...state,
        cycles: {
          ...state.cycles,
          status: action.payload,
        },
      };
    case EXECUTION_CYCLES_ROBOT_ACTIVE:
      return {
        ...state,
        robot: {
          ...state.robot,
          active: action.payload,
        },
      };
    case EXECUTION_CYCLES_ROBOT_STATUS:
      return {
        ...state,
        robot: {
          ...state.robot,
          status: action.payload,
        },
      };
    case EXECUTION_CYCLES_LAST_SYNC_TIME:
      return {
        ...state,
        cycles: {
          ...state.cycles,
          lastSyncTime: now(),
        },
      };
    case EXECUTION_CONFIGURATION_STATUS:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          status: action.payload,
        },
      };
    case EXECUTION_CONFIGURATION_DATA:
      return {
        ...state,
        configuration: {
          ...state.configuration,
          data: action.payload,
        },
      };
    case EXECUTION_SHARE_STATUS:
      return {
        ...state,
        share: {
          ...state.share,
          status: action.payload,
        },
      };
    case EXECUTION_CLEAR:
      return { ...initialState };
    default:
      return {
        ...state,
      };
  }
};

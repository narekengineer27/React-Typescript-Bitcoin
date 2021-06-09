import { Status } from 'Models/Status';
import {
  GLOBAL_STRATEGY_APPROACH_STATUS,
  GLOBAL_STRATEGY_APPROACH_GET,
  GLOBAL_STRATEGY_SWITCH_TABS,
  GlobalStrategyTabs,
  IState,
} from './types';

const initialState: IState = {
  status: new Status(),
  getGlobalStrategy: [],
  tab: GlobalStrategyTabs.Entry,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case GLOBAL_STRATEGY_APPROACH_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case GLOBAL_STRATEGY_APPROACH_GET:
      return {
        ...state,
        getGlobalStrategy:  action.payload
      };
    case GLOBAL_STRATEGY_SWITCH_TABS:
      return {
        ...state,
        tab: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

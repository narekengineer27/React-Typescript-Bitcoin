import { Status } from 'Models/Status';

export const GLOBAL_STRATEGY_APPROACH_SAVE = 'GLOBAL_STRATEGY_APPROACH_SAVE';
export const GLOBAL_STRATEGY_APPROACH_GET = 'GLOBAL_STRATEGY_APPROACH_GET';
export const GLOBAL_STRATEGY_APPROACH_SAVE_SUCCESS = 'GLOBAL_STRATEGY_APPROACH_SAVE_SUCCESS';
export const GLOBAL_STRATEGY_APPROACH_STATUS = 'GLOBAL_STRATEGY_APPROACH_STATUS';
export const GLOBAL_STRATEGY_SWITCH_TABS = 'GLOBAL_STRATEGY_SWITCH_TABS';

export enum GlobalStrategyTabs {
  Approach,
  Entry,
  Exit,
}

export type IState = {
  status: Status,
  getGlobalStrategy: object[],
  tab: GlobalStrategyTabs,
};

// export type IState = {
//   approach: {
//     data: object,
//     status: Status,
//   },
//   entry: {
//     data: object,
//     status: Status,
//   },
//   exit: {
//     data: object,
//     status: Status,
//   }
//   tab: GlobalStrategyTabs,
// };

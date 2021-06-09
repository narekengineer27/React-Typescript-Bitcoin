import { Trade } from 'Models/Trade';
import { Status } from 'Models/Status';

export const EXIT_STRATEGY_TRADE = 'EXIT_STRATEGY_TRADE';
export const EXIT_STRATEGY_STATUS = 'EXIT_STRATEGY_STATUS';
export const EXIT_STRATEGY_DEFAULTS = 'EXIT_STRATEGY_DEFAULTS';
export const EXIT_STRATEGY_DEFAULTS_STATUS = 'EXIT_STRATEGY_DEFAULTS_STATUS';
export const EXIT_STRATEGY_SET_AS_DEFAULT = 'EXIT_STRATEGY_SET_AS_DEFAULT';
export const EXIT_STRATEGY_SET_FROM = 'EXIT_STRATEGY_SET_FROM';

export type IState = {
  trade: Trade,
  status: Status,
  defaultSettings: {
    data: object,
    status: Status,
  },
  setAsDefault: boolean,
  from: string,
};

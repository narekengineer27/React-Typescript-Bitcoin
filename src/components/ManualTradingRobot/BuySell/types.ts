import { Status } from 'Models/Status';
import { MarketOrder } from 'Models/MarketOrder';
import { Trade } from 'Models/Trade';

export const BUY_SELL_OPEN = 'BUY_SELL_OPEN';
export const BUY_SELL_CLOSE = 'BUY_SELL_CLOSE';
export const BUY_SELL_INFO = 'BUY_SELL_INFO';
export const BUY_SELL_INFO_STATUS = 'BUY_SELL_INFO_STATUS';
export const BUY_SELL_BUY = 'BUY_SELL_BUY';
export const BUY_SELL_BUY_STATUS = 'BUY_SELL_BUY_STATUS';
export const BUY_SELL_SELL_STATUS = 'BUY_SELL_SELL_STATUS';
export const BUY_SELL_STRATEGY = 'BUY_SELL_STRATEGY';
export const BUY_SELL_SAVE_STRATEGY_STATUS = 'BUY_SELL_SAVE_STRATEGY_STATUS';

export enum StrategyType { SHRINK_DIFF, TARGET }

export type IState = {
  coinId?: string;
  exchangeId?: string;
  visible?: boolean;
  info?: {
    data: MarketOrder;
    status: Status;
  };
  defaultCurrency?: string;
  buyResult?: {
    status?: Status;
    tradeId?: number;
  },
  strategyType: StrategyType;
  saveStrategyStatus: Status;
  sellMode?: boolean;
  sellTrade?: Trade;
  sellResult?: {
    status?: Status;
  }
};

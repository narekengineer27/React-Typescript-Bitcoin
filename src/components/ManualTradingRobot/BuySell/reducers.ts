import { Status } from 'Models/Status';

import {
  BUY_SELL_OPEN,
  BUY_SELL_CLOSE,
  BUY_SELL_INFO,
  BUY_SELL_INFO_STATUS,
  BUY_SELL_BUY,
  BUY_SELL_BUY_STATUS,
  BUY_SELL_SELL_STATUS,
  BUY_SELL_SAVE_STRATEGY_STATUS,
  BUY_SELL_STRATEGY,
  IState,
  StrategyType,
} from './types';

const initialState: IState = {
  coinId: '',
  visible: false,
  info: {
    data: null,
    status: new Status(),
  },
  defaultCurrency: '',
  buyResult: { tradeId: null, status: new Status() },
  saveStrategyStatus: new Status(),
  strategyType: StrategyType.SHRINK_DIFF,
  sellMode: false,
  sellTrade: null,
  sellResult: { status: new Status() }
};

export default (state: IState = initialState, action): IState => {
  switch (action.type) {
    case BUY_SELL_OPEN:
      return {
        ...initialState,
        coinId: action.payload.coinId,
        exchangeId: action.payload.exchangeId,
        visible: true,
        defaultCurrency: action.payload.defaultCurrency,
        sellMode: action.payload.sellMode,
        sellTrade: action.payload.sellTrade,
      };
    case BUY_SELL_CLOSE:
      return {
        ...state, visible: false
      };
    case BUY_SELL_INFO:
      return {
        ...state, info: { ...state.info, data: action.payload }
      };
    case BUY_SELL_INFO_STATUS:
      return {
        ...state, info: { ...state.info, status: action.payload }
      };
    case BUY_SELL_BUY:
      return {
        ...state, buyResult: { ...state.buyResult, tradeId: action.payload }
      };
    case BUY_SELL_BUY_STATUS:
      return {
        ...state, buyResult: { ...state.buyResult, status: action.payload }
      };
    case BUY_SELL_SELL_STATUS:
      return {
        ...state, sellResult: { ...state.sellResult, status: action.payload }
      };
    case BUY_SELL_STRATEGY:
      return {
        ...state, strategyType: action.payload
      };
    case BUY_SELL_SAVE_STRATEGY_STATUS:
      return {
        ...state, saveStrategyStatus: action.payload
      };
    default:
      return {
        ...state,
      };
  }
};

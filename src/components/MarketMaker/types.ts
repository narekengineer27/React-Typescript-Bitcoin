import { Status } from 'Models/Status';

export const MARKET_MAKER_OFFERS = 'MARKET_MAKER_OFFERS';
export const MARKET_MAKER_OFFERS_SUCCESS = 'MARKET_MAKER_OFFERS_SUCCESS';
export const MARKET_MAKER_OFFERS_FAILURE = 'MARKET_MAKER_OFFERS_FAILURE';

export type IState = {
  status: Status,
};

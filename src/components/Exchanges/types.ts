import { Status } from 'Models/Status';

export const EXCHANGES_OFFERS = 'EXCHANGES_OFFERS';
export const EXCHANGES_OFFERS_SUCCESS = 'EXCHANGES_OFFERS_SUCCESS';
export const EXCHANGES_OFFERS_FAILURE = 'EXCHANGES_OFFERS_FAILURE';

export type IState = {
  status: Status,
};

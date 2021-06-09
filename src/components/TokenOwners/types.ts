import { Status } from 'Models/Status';

export const TOKEN_OWNERS_OFFERS = 'TOKEN_OWNERS_OFFERS';
export const TOKEN_OWNERS_OFFERS_SUCCESS = 'TOKEN_OWNERS_OFFERS_SUCCESS';
export const TOKEN_OWNERS_OFFERS_FAILURE = 'TOKEN_OWNERS_OFFERS_FAILURE';

export type IState = {
  status: Status,
};

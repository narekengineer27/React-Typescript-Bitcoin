import { Status } from 'Models/Status';
import { User } from 'Models/User';
import { Country } from 'Models/Country';
import { Currency } from 'Models/Currency';

export const SIGNUP_STATUS = 'SIGNUP_STATUS';
export const SIGNUP_SIGNUP = 'SIGNUP_SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_COUNTRIES_LOADED = 'SIGNUP_COUNTRIES_LOADED';
export const SIGNUP_CURRENCIES_LOADED = 'SIGNUP_CURRENCIES_LOADED';
export const ALL_COINS_LOADED = 'ALL_COINS_LOADED';
export const FETCH_ROLES = 'FETCH_ROLES';
export const FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS';
export const FETCH_ROLES_ERROR = 'FETCH_ROLES_ERROR';

export type IState = {
  status: Status,
  user: User,
  countries: Country[],
  currencies: Currency[],
  coins: object[]
};

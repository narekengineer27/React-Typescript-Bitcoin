import { Status } from 'Models/Status';
import { Suggestion } from 'Models/Suggestion';
import { Page } from 'Models/Page';

export const SUGGESTIONS_TABLE = 'SUGGESTIONS_TABLE';
export const SUGGESTIONS_TABLE_STATUS = 'SUGGESTIONS_TABLE_STATUS';
export const SUGGESTIONS_TABLE_SORT = 'SUGGESTIONS_TABLE_SORT';
export const SUGGESTIONS_TABLE_FILTER = 'SUGGESTIONS_TABLE_FILTER';
export const SUGGESTIONS_TABLE_SUGGESTIONS = 'SUGGESTIONS_TABLE_SUGGESTIONS';
export const SUGGESTIONS_TABLE_CLEAR_SUGGESTIONS = 'SUGGESTIONS_TABLE_CLEAR_SUGGESTIONS';
export const SUGGESTIONS_TABLE_LAST_SYNC_TIME = 'SUGGESTIONS_TABLE_LAST_SYNC_TIME';
export const SUGGESTIONS_TABLE_MOBILE_PAGINATION = 'SUGGESTIONS_TABLE_MOBILE_PAGINATION';
export const SUGGESTIONS_TABLE_MOBILE_SORT_TOGGLE = 'SUGGESTIONS_TABLE_MOBILE_SORT_TOGGLE';

export type IState = {
  suggestions: object,
  sortedSuggestions: Suggestion[],
  status: Status,
  filter: string,
  sort: string,
  lastSyncTime: string,
  mobilePage: Page,
  mobileSortVisible: boolean,
};

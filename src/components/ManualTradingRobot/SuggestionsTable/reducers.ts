import { Status } from 'Models/Status';
import { Page } from 'Models/Page';

import {
  SUGGESTIONS_TABLE_CLEAR_SUGGESTIONS,
  SUGGESTIONS_TABLE_SUGGESTIONS,
  SUGGESTIONS_TABLE_STATUS,
  SUGGESTIONS_TABLE_SORT,
  SUGGESTIONS_TABLE_FILTER,
  SUGGESTIONS_TABLE_LAST_SYNC_TIME,
  SUGGESTIONS_TABLE_MOBILE_PAGINATION,
  SUGGESTIONS_TABLE_MOBILE_SORT_TOGGLE,
  IState,
} from './types';

const initialState: IState = {
  suggestions: {},
  sortedSuggestions: [],
  status: new Status(),
  filter: '',
  sort: '',
  lastSyncTime: '',
  mobilePage: new Page(),
  mobileSortVisible: false,
};

export default (state: IState = initialState, action) => {
  switch (action.type) {
    case SUGGESTIONS_TABLE_CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: {},
        sortedSuggestions: [],
      };
    case SUGGESTIONS_TABLE_SUGGESTIONS:
      return {
        ...state,
        suggestions: {
          ...state.suggestions,
          ...action.payload,
        },
      };
    case SUGGESTIONS_TABLE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case SUGGESTIONS_TABLE_SORT:
      return {
        ...state,
        sort: action.payload + ',' + state.sort,
      };
    case SUGGESTIONS_TABLE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case SUGGESTIONS_TABLE_LAST_SYNC_TIME:
      return {
        ...state,
        lastSyncTime: action.payload,
      };
    case SUGGESTIONS_TABLE_MOBILE_PAGINATION:
      return {
        ...state,
        mobilePage: action.payload,
      };
    case SUGGESTIONS_TABLE_MOBILE_SORT_TOGGLE:
      return {
        ...state,
        mobileSortVisible: !state.mobileSortVisible,
      };
    default:
      return {
        ...state,
      };
  }
};

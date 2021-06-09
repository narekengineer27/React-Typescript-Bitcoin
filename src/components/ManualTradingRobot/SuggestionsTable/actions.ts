import * as _ from 'lodash';
import { createAction } from 'Models/Action';
import { lastSyncTime } from 'Utils/moment';
import { tailorMobilePage } from 'Utils/actions';
import { Suggestion } from 'Models/Suggestion';

import {
  SUGGESTIONS_TABLE_SORT,
  SUGGESTIONS_TABLE_FILTER,
  SUGGESTIONS_TABLE_SUGGESTIONS,
  SUGGESTIONS_TABLE_CLEAR_SUGGESTIONS,
  SUGGESTIONS_TABLE_LAST_SYNC_TIME,
  SUGGESTIONS_TABLE_MOBILE_PAGINATION,
  SUGGESTIONS_TABLE_MOBILE_SORT_TOGGLE,
} from './types';

export const mobileGoToPage = (suggestions: any, pageNo: number = 1) => {
  return (dispatch) => {
    const suggestionsArray = _.values(suggestions);
    const page = tailorMobilePage(suggestionsArray.length, pageNo);
    dispatch(createAction(SUGGESTIONS_TABLE_MOBILE_PAGINATION, page));
  };
};

export const mobileToggleSort = () => {
  return (dispatch) => {
    dispatch(createAction(SUGGESTIONS_TABLE_MOBILE_SORT_TOGGLE));
  };
};

export const updateSuggestions = (newSuggestions: Suggestion[] = [], suggestions: object = {}) => {
  return (dispatch) => {
    newSuggestions.map((newSuggestion) => {
      if (suggestions.hasOwnProperty(newSuggestion.coin)) {
        const oldSuggestion = suggestions[newSuggestion.coin];
        const fields = Object.keys(oldSuggestion);
        fields.forEach((field) => {
          newSuggestion.showMore = oldSuggestion.showMore;
          if (_.isNumber(newSuggestion[field]) && field.indexOf('_diff') < 0) {
            const diff = newSuggestion[field] - oldSuggestion[field];
            if (diff !== 0) {
              newSuggestion[`${field}_diff`] = diff;
            } else {
              newSuggestion[`${field}_diff`] = oldSuggestion[`${field}_diff`] || 0;
            }
          }
        });
      }
    });

    if (Object.keys(suggestions).length === 0) {
      dispatch(mobileGoToPage(newSuggestions, 1));
    }
    let suggestionsHash = {};
    newSuggestions.forEach(newSuggestion => {
      suggestionsHash[newSuggestion.coin] = newSuggestion;
    });
    dispatch(createAction(SUGGESTIONS_TABLE_SUGGESTIONS, suggestionsHash));
  };
};

export const clearSuggestions = () => {
  return (dispatch) => {
    dispatch(createAction(SUGGESTIONS_TABLE_CLEAR_SUGGESTIONS));
  };
};

export const doSort = (sortValue: string, suggestions: object) => {
  return (dispatch) => {
    dispatch(createAction(SUGGESTIONS_TABLE_SORT, sortValue));
  };
};

export const doFilter = (filterValue: string) => {
  return (dispatch) => {
    dispatch(createAction(SUGGESTIONS_TABLE_FILTER, filterValue.toLowerCase()));
  };
};

export const updateLastSyncTime = (unixSeconds) => {
  return (dispatch) => {
    dispatch(createAction(SUGGESTIONS_TABLE_LAST_SYNC_TIME, lastSyncTime(unixSeconds)));
  };
};

export const mobileShowMore = (suggestions, suggestion) => {
  return (dispatch) => {
    suggestion.showMore = true;
    dispatch(createAction(SUGGESTIONS_TABLE_SUGGESTIONS, suggestions));
  };
};

export const mobileShowLess = (suggestions, suggestion) => {
  return (dispatch) => {
    suggestion.showMore = false;
    dispatch(createAction(SUGGESTIONS_TABLE_SUGGESTIONS, suggestions));
  };
};
